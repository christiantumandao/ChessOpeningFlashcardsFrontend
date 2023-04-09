import React, { Component } from 'react';
class DefaultMessage extends Component {

    render() { 
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}
 
export default DefaultMessage;