
import './App.css';
import { useState, useEffect } from 'react';

import RightDisplay from "./components/rightDisplay";
import Flashcard from "./components/flashcard";
import Flashcards from "./components/flashcards";
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


  const [testMode, setTestMode] = useState(false);
  const [currFlashcard, setCurrFlashcard]= useState({});
  const [moveIndex, setMoveIndex] =useState(0);
  const [flashcardPointer, setFlashcardPointer] = useState(0);
  const [testColor, setTestColor] = useState("both");

// ========================================================================
  

  const lichessApiPath_fen ="https://explorer.lichess.ovh/masters?fen= ";


  // USE EFFECTS: getting the opening name of what is played by user
  useEffect(()=> {

    // only attempt to retrieve opening for curr position if curr position is NOT in start position
    if (testMode===false && game.fen() !=="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
      

      // mutating string to send proper request
      let uri = String(game.fen());
      let slicedUri = uri.slice(0, -6);
      let outputString = slicedUri.replace(new RegExp('/', "g"), '-');
      const encodedPathVariable = encodeURIComponent(outputString);

      // retrieving the opening for current position
      let axios_url = "http://localhost:5000/api/openings/"+encodedPathVariable;
      axios(axios_url )
      .then(response => {
        setLeftDisplayHeader([response.data.openingName, response.data.moves]);
        setCurrOpening(response.data);
      })
      .catch(error => console.error(error));
    }
    else if (testMode===true && game.fen() !=="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" ) {
      console.log('scanning move...')
      let f = game.fen().slice(0, -6);
      let moveHistory = game.history();

      let moveCorrect;
      let correctSequence = parseHistory(currFlashcard.moves);
      console.log("move index:", moveIndex);
      console.log("move made: ", moveHistory[moveIndex]);
      console.log("move expected:", correctSequence[moveIndex]);

      if (correctSequence[moveIndex]===moveHistory[moveIndex]) moveCorrect=true;
      else moveCorrect=false;

      if (f==currFlashcard.fen) {
        displayBorder();
        // going to next flashcard in deck
        console.log("flashcard pointer", flashcardPointer, "flashcards length", flashcards.length);
        if (flashcardPointer < flashcards.length-1) {
           setFlashcardPointer(flashcardPointer+1);
           setMoveIndex(0);
           setGame(new Chess());
        }
        else { // last flash card done
          setMoveIndex(0);
          setFlashcardPointer(0);
          setGame(new Chess());
          setTestMode(false);
          console.log("flashcard done!");
        }
       
      }
      else if (moveCorrect===true) {
        console.log("correct")
        let temp = moveIndex+1;
        setMoveIndex(moveIndex+1);

        if (testColor==="black" && temp % 2 ===0) {
            var newGame= new Chess();
            newGame.loadPgn(game.pgn());
            newGame.move(correctSequence[temp]);
            setGame(newGame);  
            setMoveIndex(moveIndex+1);   
        }
        else if (testColor==="white" && temp % 2 !== 0) {
            var newGame= new Chess();
            newGame.loadPgn(game.pgn());
            newGame.move(correctSequence[temp]);
            setGame(newGame);  
            setMoveIndex(moveIndex+1);   
        }
      }
      else if (moveCorrect===false) {
        console.log("false");
        setMoveIndex(0);
        setGame(new Chess());
        
      }     
    }
    else if (testMode===true && testColor==="black") {
      console.log("CATCH");
      let correctSequence = parseHistory(currFlashcard.moves);
      console.log("correct sequence first move", correctSequence[0]);
      let newGame = new Chess();
      newGame.move(correctSequence[0]);
      setGame(newGame);
    }
    
    
  }, [game.fen()])

  const displayBorder = () => {
    setShowBorder(true);
    setTimeout(() => {
      setShowBorder(false);
    }, 1000);
  };

  const [showBorder, setShowBorder] = useState(false);

  const parseHistory = (hist) => {
      let histArr = hist.split(" ");
      let returnArr = [];
      histArr.forEach(m => {
        if (!m.includes('.')) returnArr.push(m);
      })
      return returnArr;
  }


  const getDefaultMessage = () => {
    return (
      <div className = 'right-display-message-body'>
                    <div className="app-description">
                        <p>
                            Easily explore, study, and test yourself on chess openings
                        </p>
                        <p id="get-started">
                            Start by playing a move or clicking the "Search Openings" tab.
                        </p>
                    </div>
                    <div className="tech-stack">
                        <p>
                            This web application uses the lichess api for chess openings.
                        </p>
                        <p>
                            Built on React, Axios, Spring Boot MVC, Spring data jpa, AWS RDS (mySQL), AWS S3, and AWS EBS
                        </p>
                        <p>Christian Tumandao</p>
                    </div>
                    
                </div>
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

  const getFlashcards = () => {
    return (
      <div className="right-display-flashcards">
        <Flashcards 
        flashcards = { flashcards }
        handleStart = { handleStart }
        />
      </div>
      
    );
  }
  const [rightDisplayBody, setRightDisplayBody] = useState(getDefaultMessage())


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
        console.log("err")
      }
  }

  const handleAddGame = (fen) => {

    console.log("adding ",currOpening);
    let newFlashcards = flashcards;
    newFlashcards.push(currOpening);
    setFlashcards(newFlashcards);
    console.log("games:", flashcards);
  }

  useEffect(()=>{
    console.log("flashcards: ",flashcards);
  }, [flashcards])

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
    if (flashcards.length === 0) {
      setRightDisplayBody(getNoFlashcards());
      console.log("no flashcards")
    }
    else {
      setRightDisplayBody(getFlashcards());
    }
  }

  const handleExploreOpenings = () => {
    setRightDisplayBody(getDefaultMessage());
    handleReset();
  }

  const handleSearchOpenings = () => {

  }

  const handleLoginRegister = () => {

  }


  /**
   *  test mode has 3 variables:
   *  moveIndex keeps track of the move number within the opening
   *  currOpening is the opening object being tested on
   *  testMode a boolean flag 
   */
  const handleStart = (color) => {
    console.log("STARTING AS", color);
    handleReset();

    setTestMode(true);
    setMoveIndex(0);
    setTestColor(color);
    testFlashcard(flashcards[flashcardPointer]);
  }

  const testFlashcard = (flashcard) => {
    
    if (flashcard!== undefined) {
      console.log("testing flashcard", flashcard);
      setLeftDisplayHeader([flashcard.openingName]);
      console.log("flahscard pointer",flashcardPointer,"testing user on", flashcard.openingName);
      setCurrFlashcard(flashcard);   
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

            <div id="right-display">
              <RightDisplay
                rightDisplayHeader = { rightDisplayHeader }
                rightDisplayBody = { rightDisplayBody }

                // buttons 
                handleFlashcards = { handleFlashcards }
                handleExploreOpenings = { handleExploreOpenings }
                handleSearchOpenings = { handleSearchOpenings }
                handleLoginRegister ={ handleLoginRegister }
                
              />
            </div>

          </div>

    </div>
  );
}

export default App;
