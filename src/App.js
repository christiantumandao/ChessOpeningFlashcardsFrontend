
import './App.css';
import { useState, useEffect } from 'react';

import RightDisplay from "./components/rightDisplay";
import Flashcard from "./components/flashcard";
import Flashcards from "./components/flashcards";
import SearchOpenings from './components/searchOpenings';
import DefaultMessage from './components/defaultMessage';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import axios from 'axios';

function App() {

  // game references
  const [game, setGame] = useState(new Chess());
  const [flashcards, setFlashcards] = useState([]);
  const [currOpening, setCurrOpening] = useState({});

  // game settings
  const [colorOrientation, setOrientation] = useState('white');
  const [undoBool, setUndo] = useState(false);

  // displays ================================================================
  const [leftDisplayHeader, setLeftDisplayHeader] = useState(["Play a move to explore", ""]); // name, 
  const [rightDisplayHeader, setRightDisplayHeader] = useState('Chess Opening Flashcards');
  // rightDisplayBody 

  // testMove
  const [testMode, setTestMode] = useState(false);
  const [currFlashcard, setCurrFlashcard]= useState({});
  const [flashcardPointer, setFlashcardPointer] = useState(0);
  const [moveIndex, setMoveIndex] =useState(0);
  const [testColor, setTestColor] = useState("white");
  const [showBorder, setShowBorder] = useState(false);

  // functions ===============================================================
  

  // USE EFFECTS: called for every change in board position / reset
  useEffect(()=> {

    // Move was made while NOT in testMode and not in root position
    if (testMode===false && game.fen() !=="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
      // RETRIEVE OPENING NAME FOR CURRENT POSITION

      // configuring string to format into uri
      let uri = String(game.fen()); // getting fen
      let slicedUri = uri.slice(0, -6);   //cutting out footer of FEN
      let outputString = slicedUri.replace(new RegExp('/', "g"), '-'); // replace every backslash w/ hyphen
      const encodedPathVariable = encodeURIComponent(outputString); // replace spaces with %20

      // retrieving the opening for current position
      let axios_url = "http://localhost:5000/api/openings/"+encodedPathVariable;
      axios(axios_url )
      .then(response => {
        setLeftDisplayHeader([response.data.openingName, response.data.moves]);
        setCurrOpening(response.data);
      })
      .catch(error => console.error(error));
    }

    // Move was made or board was reset under testMode
    else if (testMode===true && game.fen() !=="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" ) {
      console.log('scanning move...')
      let f = game.fen().slice(0, -6);
      let moveHistory = game.history();

      let moveCorrect;
      let correctSequence = parseHistory(currFlashcard.moves);

      if (correctSequence[moveIndex]===moveHistory[moveIndex]) moveCorrect=true;
      else moveCorrect=false;

      // if got the last correct move and finished currFlashcard
      if (f==currFlashcard.fen) {
        displayBorder();
        // going to next flashcard in deck

        // starting new flashcard
        if (flashcardPointer < flashcards.length-1) {
           setFlashcardPointer(flashcardPointer+1);
           setMoveIndex(0);
           setGame(new Chess());
        }

        // last flash card done
        else { 
          setMoveIndex(0);
          setFlashcardPointer(0);
          setCurrFlashcard({});
          setGame(new Chess());
          setTestMode(false);
          setLeftDisplayHeader(["",""]);

          setRightDisplayBody(getFlashcards());
          console.log("flashcards done!");
        }
       
      }

      // made correct move INSIDE opening
      else if (moveCorrect===true) {
        console.log("Move correct");
        let temp = moveIndex+1;
        setMoveIndex(moveIndex+1);

        // if user playing as black made correct move
        if (testColor==="black" && temp % 2 ===0) {
          if (flashcardPointer !== flashcards.length-1) {
            var newGame= new Chess();
            newGame.loadPgn(game.pgn());
            newGame.move(correctSequence[temp]);
            setGame(newGame);  
            setMoveIndex(moveIndex+1);   
          }
          // if last move in opening is autoplayed
          else if (flashcardPointer === flashcards.length-1)
            setTimeout(() => {
              var newGame= new Chess();
              newGame.loadPgn(game.pgn());
              newGame.move(correctSequence[temp]);
              setGame(newGame);  
              setMoveIndex(moveIndex+1);                 
            }, 1000)
        }
        //if user playing as white made correct move
        else if (testColor==="white" && temp % 2 !== 0) {
            var newGame= new Chess();
            newGame.loadPgn(game.pgn());
            newGame.move(correctSequence[temp]);
            setGame(newGame);  
            setMoveIndex(moveIndex+1);   
        }

      }
      // made mistake
      else if (moveCorrect===false) {
        console.log("Move incorrect. Restarting...");
        setMoveIndex(0);
        setGame(new Chess());
      }    
    // init move testing as black
    }
    else if (testMode===true && testColor==="black" && game.fen()==="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
      setTimeout(() => {
        let correctSequence = parseHistory(currFlashcard.moves);
        let newGame = new Chess();
        newGame.move(correctSequence[0]);
        setGame(newGame);
      }, 750);
    }
    
    
  }, [game.fen(), testColor])

  const displayBorder = () => {
    setShowBorder(true);
    setTimeout(() => {
      setShowBorder(false);
    }, 1000);
  };

  const parseHistory = (hist) => {
      let histArr = hist.split(" ");
      let returnArr = [];
      histArr.forEach(m => {
        if (!m.includes('.')) returnArr.push(m);
      })
      return returnArr;
  }

  // GET DISPLAY BODIES
  

  const getDefaultMessage = () => {
    return (
      <DefaultMessage />
    );
  }
  const getNoFlashcards = () => {
    return (
      <div className ='right-display-message-body-noFlashcards'>
          <h3>You have no flashcards added! </h3>
          <p>Explore or search for openings and add them to use flashcards.</p>
      </div>
    );
  }
  const [rightDisplayBody, setRightDisplayBody] = useState(getDefaultMessage());

  const getDeck = () => {
    return (
      <div className="right-display-flashcards">
          {
                flashcards.map(flashcard=> (
                    <div className="right-display-flashcard deck-flashcard" key ={flashcard.eco}>
                        <Flashcard 
                            openingName = {flashcard.openingName}
                            eco = {flashcard.eco}
                        />
                    </div>
                ))
            }
      </div>
    );
  }

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  })
  const handleSubmit = () => {
    console.log("handing submit");
  }
  const handleChange =()=>{
  }
  const getRegistrationGUI = () => {
    return (
      <div className="registration-gui">
        <form 
            className="registration-gui-form"
            onSubmit={handleSubmit}>
              Registration
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <div className="register-submit-button">
          <button  type="submit">Register</button>
            </div>
        </form>
      </div>
    );
  }
  const handleRegister = () =>{
    setRightDisplayBody(getRegistrationGUI());
  }
  const getLoginRegistrationGUI = () => {
    return (
      
      <div class="right-display-message-body login-registration-gui">
        <div className="login-title">
          <div>Don't have an account? Register:</div>
          <button onClick={ handleRegister }>Register</button>
        </div>
        <form 
            className="login-registration-gui-form"
            onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>

      </div>
    );
  }

  const getFlashcards = () => {
    return (
      <div className="right-display-flashcards">
         <div className="flashcards-config">
                <div className="config-text"><p>Play as</p></div>
                <button className="config-button" onClick={()=>handleStart("white")}>White</button>
                <button className="config-button" onClick={()=>handleStart("black")}>Black</button>
                <button className="config-button" onClick={()=>handleStart("both")}>Both</button>
          </div>
        <Flashcards 
        flashcards = { flashcards }
        handleStart = { handleStart }
        />
      </div>
      
    );
  }


  const getRightDisplay = () => {
    return (
      <div id="right-display">
        {/**right display header */}
        <div id ="right-display-header">
            {
                 rightDisplayHeader
            }
        </div>

        {/**right display subheader */}
        <div id ="right-display-subheader">
            <button id="flashcards-button" onClick = { () => handleFlashcards() }>Flashcards</button>
            <button id="explore-button" onClick= { () => handleExploreOpenings() }>Explore Openings</button>
            <button id="search-button" onClick = { () => handleSearchOpenings() }>Search Openings</button>
            <button id="login-button" onClick = { () => handleLoginRegister()}>Login</button>
        </div>


        {/** right display message body */}
        <div className="right-display-body">
          { rightDisplayBody}
        </div>

    </div>
    );
  }

  const getSearchOpenings = () => {
    return (
      <div className="search-openings">
        <SearchOpenings 
            handleAddGame = { handleAddGame }
        />
      </div>
      
    );
  }


// HANDLE METHODS
  const handleMove = (fromSquare, toSquare) => {
      // updating game

      // make new object to replace game
      var newGame= new Chess();
      newGame.loadPgn(game.pgn());

      // move
      try {
        newGame.move({
          from: fromSquare,
          to: toSquare
         });
        setGame(newGame);  
      }
      catch {
        console.log("Invalid move!")
      }
  }

  //add opening to flashcards (object w/ 4 pairs)
  const handleAddGame = () => {

    console.log("adding opening:",currOpening);
    let newFlashcards = flashcards;
    newFlashcards.push(currOpening);
    setFlashcards(newFlashcards);
  }



  // bottom left button handlers
  const swapOreintation = () => {
    if (colorOrientation==='white') setOrientation('black');
    else setOrientation('white');
  }

  const handleUndo =() => {
    try {
      let undoReturn = game.undo();
      let currPgn = game.pgn();

      let newGame = new Chess(undoReturn.after);
      newGame.loadPgn(currPgn);

      setGame(newGame);
      setUndo(true);
      if (moveIndex>0) setMoveIndex(moveIndex-1);
    }
    catch {
      console.log("Swap failed.")
    }  
  }

  const handleReset = () => {
    setGame(new Chess());
    setMoveIndex(0);
    setLeftDisplayHeader(["",""]);
  }

  // getting button class for top left button (add to game queue)
  const getButtonClass = () => {
    if (leftDisplayHeader[0]==="" || leftDisplayHeader[0]===undefined || leftDisplayHeader[0]==="Play a move to explore") return "display-none";
    else return "opening-btn btn-queue";

  }

  // top right buttons 
  const handleFlashcards = () => {
    setTestMode(false);
    handleReset();
    if (flashcards.length === 0) {
      setRightDisplayBody(getNoFlashcards());
    }
    else {
      setRightDisplayBody(getFlashcards());
    }
  }

  const handleExploreOpenings = () => {
    setTestMode(false);
    handleReset();
    setRightDisplayBody(getDefaultMessage());
    
  }

  useEffect(()=> {
    console.log(rightDisplayBody);
  },[rightDisplayBody, testMode])

  const handleSearchOpenings = () => {
    setTestMode(false);
    setRightDisplayBody(getSearchOpenings());
    handleReset();
  }

  const handleLoginRegister = () => {
    setTestMode(false);
    handleReset();
    setRightDisplayBody(getLoginRegistrationGUI());
  }


  /**
   *  test mode has 4 variables:
   *  testMode a boolean flag 
   *  moveIndex keeps track of the move number within the opening
   *  currOpening is the opening object being tested on
   *  
   *  references flashcards
   */
  const handleStart = (color) => {

    if (color==="white") {setTestColor("white");}
    else if (color==="black") {setTestColor("black");}
    else {setTestColor("both");}

    if (color==="black") {setOrientation("black");}
    else {setOrientation("white");}

    setFlashcardPointer(0);
    setMoveIndex(0);
    handleReset();
    setTestMode(true);
    setMoveIndex(0);

    setRightDisplayBody(getDeck());

    testFlashcard(flashcards[0]);
  }



  const testFlashcard = (flashcard) => {
    
    if (flashcard!== undefined) {
      setLeftDisplayHeader([flashcard.openingName]);
      setCurrFlashcard(flashcard);   
      let newGame = new Chess();
      setGame(newGame);
    }

  }


  useEffect(() => {
    testFlashcard(flashcards[flashcardPointer]);
  }, [flashcardPointer])

  
  return (
    <div className="App">

          <div id="body">
          
            <div id="left-display">

              <div id="opening-buttons">
                      <button 
                        className={ getButtonClass() }
                        onClick = { ()=>handleAddGame(game.fen()) }
                      
                      >
                        Add to flashcards</button>
              </div>

              <div id="left-display-header" 
              style={{
              backgroundColor: ` ${showBorder ? "rgba(69,203,133,0.29)" : " rgba(107, 153, 129, 0.29)"}`, // Set border color based on showBorder value
              }}>
                    <p id="opening-name"> { leftDisplayHeader[0] }</p>
                    <p id="opening-moves"> { leftDisplayHeader[1] } </p>
              </div>

              <div id="board" >
           
               <Chessboard 
                  boardWidth={400} 

                  position = { game.fen() }
                  onPieceDrop = { handleMove }

                  boardOrientation = { colorOrientation }
                  showNotation = { true }  
                 /> 
                
              </div> 

              <div id="board-buttons">
   
                <button id="undo"
                  onClick= { handleUndo }
                  >Undo</button>

                <button id ="flip"
                  onClick = { swapOreintation }
                  >Flip
                  </button>

                <button id="reset"
                  onClick = { handleReset }
                >Reset</button>
              </div>

            </div>

            {/**under id=right-display */}
             { getRightDisplay() }

          </div>

    </div>
  );
}

export default App;
