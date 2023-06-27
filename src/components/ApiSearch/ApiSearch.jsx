import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
// import SearchList from '../SearchList/SearchList';

function ApiSearch() {

    const [search, setSearch] = useState([]);
    const dispatch = useDispatch();

    const sendSearch = (event) => {
        event.preventDefault();
        console.log('Client search term is:', search);
        dispatch({
            type: 'FETCH_RESULTS',
            payload: search
        })
        // history.push('/results');
        // once results page is more defined, need to include this redirect to results view
    }


    // ensure universal button styling on submit button
    return (
        <>
            <form onSubmit={sendSearch}>
                <input
                    onChange={(event) => setSearch(event.target.value)}
                    type="text"
                    placeholder="Pick a book, any book."
                    required
                    value={search}
                />
                <button type="submit">GET THOSE BOOKS</button>
            </form>
            {/* <SearchList /> */}
        </>
    )
}

export default ApiSearch;