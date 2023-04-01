import React, { Component } from 'react';

class Display extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
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
                        getPositionObject = {  (currentPosition) => { console.log(currentPosition)}}

                        /> 
                    </div> 

                    <div id="board-buttons">
        
                        <button id="undo">Undo</button>
                        <button id="flip">Flip</button>
                        <button id="reset">Reset</button>
                    </div>

                    </div>


                    <div id="right-display">
                    <RightDisplay />
                    </div>

                </div>
            </React.Fragment>
        );
    }
}
 
export default Display;