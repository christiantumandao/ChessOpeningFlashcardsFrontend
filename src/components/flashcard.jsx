import React, { Component } from 'react';

class Flashcard extends Component {

    render() { 
        return (
            <React.Fragment>
                <div className="flashcard-name">[{ this.props.eco }] {this.props.openingName}</div>
                <div className="flashcard-moves">{ this.props.moves }</div>
            </React.Fragment>
        );
    }
}
 
export default Flashcard;