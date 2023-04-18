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
                        <p id="sign-in-message">Sign in to save your added flashcards and track statistics!</p>
                    </div>
                    <div className="tech-stack">
                        <p>This web application uses ECO for chess openings.</p>
                        <p>Built on ReactJS, Axios, Spring Boot MVC, Spring Data JPA, and AWS RDS (mySQL)</p>
                        <p>Deployed on AWS S3, and AWS EBS</p>
                        <p>Christian Tumandao</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default DefaultMessage;