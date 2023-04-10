import React, { Component } from 'react';
import SearchResult from './searchResult';
class SearchOpenings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: {}
        };
    }
    
    handleSubmit = () => {
        console.log("submit");
    }
    handleChange = () => {
        console.log("change");

    }

    // component inside className search-openings
    render() { 

        return (
            <React.Fragment>
                <div className="search-bar-container">
                    <input
                        type="text"
                        name="opening"
                        value={this.searchData}
                        onChange={this.handleChange}
                        placeholder="Search openings"
                        />
                </div>

                <div className="search-results">
                    
                    <div className="search-result">
                        <SearchResult 
                            eco = {"A69"}
                            openingName = {" gambit"}
                            handleAddGame = { this.props.handleAddGame }
                        />
                    </div>
                    <div className="search-result">
                        <SearchResult 
                            eco = {"A69"}
                            openingName = {"test gambit"}
                            handleAddGame = { this.props.handleAddGame }
                        />
                    </div><div className="search-result">
                        <SearchResult 
                            eco = {"A69"}
                            openingName = {"test gambit"}
                            handleAddGame = { this.props.handleAddGame }
                        />
                    </div><div className="search-result">
                        <SearchResult 
                            eco = {"A69"}
                            openingName = {"test gambit"}
                            handleAddGame = { this.props.handleAddGame }
                        />
                    </div><div className="search-result">
                        <SearchResult 
                            eco = {"A69"}
                            openingName = {"test gambit"}
                            handleAddGame = { this.props.handleAddGame }
                        />
                    </div><div className="search-result">
                        <SearchResult 
                            eco = {"A69"}
                            openingName = {"test gambit"}
                            handleAddGame = { this.props.handleAddGame }
                        />
                    </div>

  
                </div>

            </React.Fragment>
        );
    }
}
 
export default SearchOpenings;