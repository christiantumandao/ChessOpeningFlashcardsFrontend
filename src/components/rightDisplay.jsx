import React, { Component } from 'react';

class rightDisplay extends Component {
    render() { 
        return (
            <React.Fragment>

                {/**right display header */}
                <div id ="right-display-header">
                    {
                        this.props.rightDisplayHeader
                    }
                </div>

                {/**right display subheader */}
                <div id ="right-display-subheader">
                    <button id="flashcards-button" onClick = { () => this.props.handleFlashcards() }>Flashcards</button>
                    <button id="explore-button" onClick= { () => this.props.handleExploreOpenings() }>Explore Openings</button>
                    <button id="search-button" onClick = { () => this.props.handleSearchOpenings() }>Search Openings</button>
                    <button id="login-button" onClick = { () => this.props.handleLoginRegister()}>Login</button>
                </div>


                {/** right display message body */}
                { this.props.rightDisplayBody}


            </React.Fragment>
        );
    }

    getClasses = (divType) => {
        
        if (divType === "right-display-tabs") {
            if (this.props.displayTabs === true) return divType; 
            else return 'display-none';
        }
        else if (divType ==="right-display-message-body") {
            if (this.props.displayTabs === false) return divType; 
            else return 'display-none';
        }
    }
}
 
export default rightDisplay;