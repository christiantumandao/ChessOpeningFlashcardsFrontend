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
                    <button id="explore-button">Explore Openings</button>
                    <button id="search-button">Search Openings</button>
                    <button id="login-button">Login/Register</button>
                </div>

                {/** right display tabs */}
                <div className = { this.getClasses("right-display-tabs") }>
                    { 
                        this.props.rightDisplayBody
                    }
                </div>

                {/** right display message body */}
                <div className = { this.getClasses('right-display-message-body')}>
                    <div className="app-description">
                        <p>
                            Easily explore, study, and test yourself on chess openings
                        </p>
                        <p id="get-started">
                            Start by playing a move or clicking the "Search Openings" tab.
                        </p>
                    </div>
                    <div className="tech-stack">
                        <p>
                            This web application uses the lichess api for chess openings.
                        </p>
                        <p>
                            Built on React, Axios, Spring Boot MVC, Spring data jpa, AWS RDS (mySQL), AWS S3, and AWS EBS
                        </p>
                        <p>Christian Tumandao</p>
                    </div>
                    
                </div>

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