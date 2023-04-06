import logo from './logo.svg';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

import RightDisplay from "./components/rightDisplay";
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import axios from 'axios';

function App() {

  // game references
  const [game, setGame] = useState(new Chess());
  const [gameQueue, setGameQueue] = useState([]);

  // game settings
  const [colorOrientation, setOrientation] = useState('white');
  const [undoBool, setUndo] = useState(false);

  // displays ================================================================
  const [leftDisplayHeader, setLeftDisplayHeader] = useState(['Play a move to explore', ""]); // name, 
  const [rightDisplayHeader, setRightDisplayHeader] = useState('Chess Opening Flashcards');

  const [rightDisplayTabs, setRightDisplayTabs] = useState([]); // MUST BE array to map properly
  const [displayTabs, setDisplayTabs] = useState(false); // display tabs ? true : false

// ========================================================================
  

  const lichessApiPath_fen ="https://explorer.lichess.ovh/masters?fen= ";


  // USE EFFECTS

  // updating the opening name under explore
    // updates when game position is changed [game.fen()]
  useEffect(() => {

    // make if else statement to not execute this if fen is chess init position
    let currFen = game.fen();
    let axios_url = lichessApiPath_fen+currFen;
    axios(axios_url)
    .then(response => {
      if (response.data.opening.name!==null) {
        let openingName  = response.data.opening.name;
        let openingEco = response.data.opening.eco;

        let hist = parseHistory(game.history());

        setLeftDisplayHeader([
          String("[" + String(openingEco) + "] " + String(openingName)), 
          hist
        ]);
      }
      
      
  })
    .catch(error => {
      let hist = parseHistory(game.history())
      if (hist==="" || hist ===null) setLeftDisplayHeader(["Play a move to explore", hist]);
      else setLeftDisplayHeader(["", hist]);

    });

  }, [game.fen()])


  const parseHistory = (history) => {
    var historyString = "";
    var moveCount=1;
    history.forEach( (e, i) => {
      if (i % 2 ===0) {
        historyString+=String(moveCount);
        moveCount+=1;
        historyString+=". ";
      }
      historyString+=e;
      historyString+=" ";
      })
      return historyString;
    
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
        console.log("err")
      }
      


  }

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
    }
    catch {

    }
      
  }

  const handleReset = () => {
    setGame(new Chess());
    setLeftDisplayHeader(["Play a move to explore",""]);
  }

  const getButtonClass = () => {
    if (leftDisplayHeader[0]==="") return "display-none";
    else return "opening-btn btn-queue";
  }

  const handleAddGame = (fen) => {
    console.log("adding game to queue");
    let gq = gameQueue;
    gq.push(fen);
    setGameQueue(gq);
    console.log(gq);
  }


  return (
    <div className="App">

          <div id="title">
            <h1>Chess Opening Flashcards</h1>
          </div>

          <div id="body">
          
            <div id="left-display">

              <div id="opening-buttons">
                      <button 
                        className={ getButtonClass() }
                        onClick = { ()=>handleAddGame(game.fen()) }
                      
                      >
                        Add to queue</button>
              </div>

              <div id="left-display-header">
                    <p id="opening-name"> { leftDisplayHeader[0] }</p>
                    <p id="opening-moves"> { leftDisplayHeader[1] } </p>
              </div>

              <div id="board" >
           
               <Chessboard 
                  boardWidth={500} 

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
                rightDisplayTabs = { rightDisplayTabs }
                displayTabs = { displayTabs }
              />
            </div>

          </div>

    </div>
  );
}

export default App;
