import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';

function ApiSearch() {

    const [search, setSearch] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const sendSearch = (event) => {
        event.preventDefault();
        console.log('Client search term is:', search);
        dispatch({
            type: 'FETCH_RESULTS',
            payload: search
        })
        history.push('/results');
    }


    // ensure universal button styling on submit button
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // Adjust the height as per your requirement
                    marginTop: '-20vh',
                }}
            >
                <form
                    id="user-search"
                    onSubmit={sendSearch}
                >
                    <label
                        htmlFor="search-input"
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            marginBottom: '1rem',
                            fontSize: '1.75rem', 
                            fontWeight: 'bold',
                        }}
                    >
                        WHAT BOOK DO YOU WANT?
                    </label>
                    <input
                        id="search-input"
                        onChange={(event) => setSearch(event.target.value)}
                        type="text"
                        placeholder="Pick a book, any book."
                        required
                        autoComplete="on"
                        value={search}
                        style={{
                            display: 'block',
                            margin: '0 auto',
                            width: '90%',
                            padding: '0.5rem',
                            marginBottom: '1rem',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            display: 'block',
                            margin: '0 auto',
                        }}
                    >
                        GET THAT BOOK
                    </button>
                </form>
            </Box >
        </>
    )
}

export default ApiSearch;