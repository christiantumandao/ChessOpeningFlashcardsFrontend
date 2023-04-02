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

  const [rightDisplayHeader, setRightDisplayHeader] = useState('Chess Opening Flashcards');
  const [rightDisplaySubheader, setRightDisplaySubheader] = useState([]);
  const [rightDisplayTabs, setRightDisplayTabs] = useState([]); // MUST BE array to map properly
  const [displayTabs, setDisplayTabs] = useState(false); // display tabs ? true : false
  const axios_base_url = "https://raw.githubusercontent.com/hayatbiralem/eco.json/master/eco.json";

  const [history, setHistory] = useState("");
  const [moveCount, setMoveCount] = useState(0);
  
  useEffect(()=>{
    console.log(history);
  }, [history])

  useEffect(() => {
    let currFen = game.fen(); 
    currFen = currFen.substring(0, currFen.length -6);
    let url_fen = currFen.replaceAll(' ', "%20");
    console.log("FEN:", currFen);

    let axios_url = axios_base_url+"?moves="+url_fen;
    console.log("url: ", axios_url);
    
  }, [game.fen()])

  const handleMove = (fromSquare, toSquare) => {
    try {
      var newGame = new Chess(game.fen());
      var move = newGame.move({
          from: fromSquare,
          to: toSquare,
          promotion: 'q' 
      });
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
  }


  return (
    <div className="App">

          <div id="title">
            <h1>Chess Opening Flashcards</h1>
          </div>

          <div id="body">
          
            <div id="left-display">

              <div id="left-display-header">
                 { } 
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
                  onClick = { handleUndo }
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
