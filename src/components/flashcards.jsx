import React, { Component } from 'react';
import Flashcard from './flashcard';


class Flashcards extends Component {
    constructor(props) {
        super(props);
        this.keyCount = 0;
        this.getKey = this.getKey.bind(this);
    }
    render() { 
        return (
            <React.Fragment>
                
                <div className="flashcards-config">
                        <h3 className="flashcards-config-text">Play as </h3>
                        <div className="flashcards-config-buttons">
                            <button className="config-button" onClick={()=>this.props.handleStart("white")}>White</button>
                            <button className="config-button" onClick={()=>this.props.handleStart("black")}>Black</button>
                            <button className="config-button" onClick={()=>this.props.handleStart("both")}>Both</button>
                        </div>

                </div>

            {
                this.props.flashcards.map(flashcard=> (
                    <div className="right-display-flashcard" key ={this.getKey()}>
                        <Flashcard 
                            openingName = {flashcard.openingName}
                            eco = {flashcard.eco}
                            moves ={flashcard.moves}
                            fen = {flashcard.fen}
                        />

                    </div>
                ))
            }
        </React.Fragment>
        );
    }

    getKey() {
        return this.keyCount++;
    }

}
 
export default Flashcards;