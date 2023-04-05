import logo from './logo.svg';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

import RightDisplay from "./components/rightDisplay";
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import axios from 'axios';

function App() {

  const [game, setGame] = useState(new Chess());

  const [colorOrientation, setOrientation] = useState('white');
  const [undoBool, setUndo] = useState(false);

  const [leftDisplayHeader, setLeftDisplayHeader] = useState(['Play a move to begin',""]); // name, 
  const [rightDisplayHeader, setRightDisplayHeader] = useState('Chess Opening Flashcards');
  const [rightDisplaySubheader, setRightDisplaySubheader] = useState([]);
  const [rightDisplayTabs, setRightDisplayTabs] = useState([]); // MUST BE array to map properly
  const [displayTabs, setDisplayTabs] = useState(false); // display tabs ? true : false
  const axios_base_url = "https://raw.githubusercontent.com/hayatbiralem/eco.json/master/eco.json";

  const [history, setHistory] = useState("");
  const [moveCount, setMoveCount] = useState(0);

  const lichessApiPath_fen ="https://explorer.lichess.ovh/masters?fen= ";
  

  // USE EFFECTS

  // updating the opening name under explore
  useEffect(() => {
    // make if else statement to not execute this if fen is chess init position
    let currFen = game.fen();
    let axios_url = lichessApiPath_fen+currFen;
    axios(axios_url)
    .then(response => {
      console.log("move history", game.history());
      if (response.data.opening.name!==null) {
        let openingName  = response.data.opening.name;
        setLeftDisplayHeader([openingName, ("eco: "+response.data.opening.eco)]);
      }
      
  })
    .catch(error => {
      setLeftDisplayHeader(["",""])
    });
  }, [game.fen()])


// HANDLE METHODS
  const handleMove = (fromSquare, toSquare) => {
    try {
      // updating game
      var newGame = new Chess(game.fen());
      var move = newGame.move({
          from: fromSquare,
          to: toSquare,
          promotion: 'q' 
      });

      // changing history
      if (game.turn()==='w') {
        setHistory(history + " "+String(moveCount+1)+'. '+toSquare);
        setMoveCount(moveCount+1);
      }
      else if (game.turn()==='b') {
        setHistory(history+" "+toSquare);
      }
      
      setGame(newGame);
    }
    catch {
      console.log("move failed");
    }

  }

  const swapOreintation = () => {
    if (colorOrientation==='white') setOrientation('black');
    else setOrientation('white');
  }
  const handleUndo =() => {
      setUndo(true);
  }
  const handleReset = () => {
    setGame(new Chess());
    setHistory('');
    setMoveCount(0);
    setLeftDisplayHeader(['','']);
  }

  const getButtonClass = () => {
    if (leftDisplayHeader[1]==="") return "display-none";
    else return "opening-btn btn-queue";
  }

  return (
    <div className="App">

          <div id="title">
            <h1>Chess Opening Flashcards</h1>
          </div>

          <div id="body">
          
            <div id="left-display">

            <div id="opening-buttons">
                    <button className={getButtonClass()}>Add to queue</button>
            </div>

              <div id="left-display-header">

                    <p id="opening-name"> { leftDisplayHeader[0] }</p>
                    <p id="opening-moves"> { leftDisplayHeader[1]}</p>

                 
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
