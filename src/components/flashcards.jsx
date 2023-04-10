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