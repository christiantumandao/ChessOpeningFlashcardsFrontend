import React, { Component } from 'react';

class Flashcard extends Component {
    
    render() { 
        return (
            <React.Fragment>
                <div className="flashcard-left">
                    <div className="flashcard-name">[{ this.props.eco }] {this.props.openingName}</div>
                    <div className="flashcard-moves">{ this.props.moves }</div>
                </div>
                <div className="flashcard-right">
                    <button 
                    onClick ={()=> this.props.handleRemoveGame(this.props.fen)}
                    >
                        Remove</button>
                </div>


            </React.Fragment>
        );
    }
}
 
export default Flashcard;