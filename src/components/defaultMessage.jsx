import React, { Component } from 'react';
class DefaultMessage extends Component {

    render() { 
        return (
            <React.Fragment>
                <div className="app-description">
                    <div className="main-description">
                        <p>
                            Easily <span className="color-text">explore</span>, 
                            <span className="color-text"> study</span>, and 
                            <span className="color-text"> test</span> yourself on chess openings
                        </p>
                        <p id="get-started">
                            Start by <span className="color-text">playing a move </span> 
                            or clicking the "<span className="color-text">Search Openings</span>" tab.
                        </p>
                    </div>
                    <div className="tech-stack">
                        <p>This web application uses the lichess api for chess openings.</p>
                        <p>Built on React, Axios, Spring Boot MVC, Spring data jpa, AWS RDS (mySQL), AWS S3, and AWS EBS</p>
                        <p>Christian Tumandao</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default DefaultMessage;