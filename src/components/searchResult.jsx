import React, { Component } from 'react';

class SearchResults extends Component {

    render() { 
        return (
            <React.Fragment>
                <div className="search-result-name">
                    [{this.props.eco}] 
                    {this.props.openingName}
                </div>

                <button className = "search-result-button"
                    onClick = { () => { this.props.handleAddGame({
                    openingName: this.props.openingName,
                    fen: this.props.fen,
                    moves: this.props.moves,
                    eco: this.props.eco
                })}}
                >Add game</button>

            </React.Fragment>
        );
    }
}
 
export default SearchResults;