import React, { Component } from 'react';
import Flashcard from './flashcard';
class Deck extends Component {
    render() { 
        return (
            <div className="right-display-flashcards">
                {
                  this.props.flashcards.map(flashcard => (
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
}
 
export default Deck;