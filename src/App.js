import logo from './logo.svg';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import { useState} from 'react';

import RightDisplay from "./components/rightDisplay";
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

function App() {

  const [colorOrientation, setOrientation] = useState('white');
  
  const swapOreintation = () => {
    if (colorOrientation==='white') setOrientation('black');
    else setOrientation('white');
  }

  return (
    <div className="App">

          <div id="title">
            <h1>Chess Opening Flashcards</h1>
          </div>

          <div id="body">
          
            <div id="left-display">

              <div id="left-display-header">
                  left display header
              </div>

              <div id="board" >
           
                <Chessboard 
                  boardWidth={500} 
                  boardOrientation = {colorOrientation}
                  getPositionObject = {  (currentPosition) => { console.log(currentPosition)}}


                 /> 
              </div> 

              <div id="board-buttons">
   
                <button id="undo">Undo</button>
                <button id ="flip"
                  onClick = {swapOreintation}
                  >Flip
                  </button>
                <button id="reset">Reset</button>
              </div>

            </div>


            <div id="right-display">
              <RightDisplay />
            </div>

          </div>

    </div>
  );
}

export default App;
