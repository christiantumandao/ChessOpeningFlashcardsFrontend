import React, { Component } from 'react';

class SearchResults extends Component {

    render() { 
        return (
            <React.Fragment>
                <div>
                    [{this.props.eco}] 
                    {this.props.openingName}
                </div>
                <div>
                    <button>Add game</button>
                </div>
            </React.Fragment>
        );
    }
}
 
export default SearchResults;