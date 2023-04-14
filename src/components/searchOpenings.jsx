import React, { useState } from 'react';
import SearchResult from './searchResult';
import axios from 'axios';

function SearchOpenings(props) {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch =  (e) => {
        e.preventDefault();
        let query = search;
        setSearch(search);
        let axios_url = "http://localhost:5000/api/openings/find-opening?search="+String(search);
        try {
            axios.get(axios_url)
            .then(response => {
                //setSearchResults([response.data]);
                console.log("search results: ", response);
                setSearchResults(response.data);
            })
            .catch(error => {console.error(error)});
        }
        catch (error) {
            console.error("Error searching for result: ", error);
        }
    }

    const handleChange =(searchRes)=> {
        setSearch(searchRes);
    }

    // component inside className search-openings
    return (
        <React.Fragment>
            <div className="search-bar-container">
                <form className="search-bar-form" onSubmit={ handleSearch }>
                    <input
                            type="text"
                            value={search}
                            onChange={ (e) => handleChange(e.target.value) }
                            placeholder="Search openings"
                            />
                    <button className="search-bar-button"
                        type="submit"
                    > Search </button>

                </form>
                    

            </div>

            <div className="search-results">
                {
                    searchResults.map(opening => (
                        <div className="search-result" key={opening.moves}>
                            <SearchResult key = {opening.moves}
                            
                            eco = {opening.eco}
                            openingName = {opening.openingName}
                            fen = {opening.fen}
                            moves = {opening.moves}

                            handleAddGame = { props.handleAddGame }
                        
                            />
                        </div>
                    ))
                }
            </div>

        </React.Fragment>
    );

}
 
export default SearchOpenings;