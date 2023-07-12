import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


function ApiSearch() {

    const [search, setSearch] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    // sends user input data to api route
    // directs to results view
    // dispatches to results saga
    const sendSearch = (event) => {
        event.preventDefault();
        console.log('Client search term is:', search);
        dispatch({
            type: 'FETCH_RESULTS',
            payload: search
        })
        history.push(`/results/${search}`);
    }

    // user input for api book search
    // ensure universal button styling on submit button
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    marginTop: '-20vh',
                }}
            >
                <form
                    id="user-search"
                    onSubmit={sendSearch}
                    style={{ 
                        textAlign: 'center' 
                    }}
                >
                    <label
                        id="search-label"
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
                        autoComplete="off"
                        value={search}
                        style={{
                            display: 'block',
                            margin: '0 auto',
                            width: '90%',
                            padding: '0.5rem',
                            marginBottom: '1rem',
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            startIcon={<SearchIcon />}
                            name="search"
                            type="submit"
                        >
                            GET THAT BOOK
                        </Button>
                    </div>
                </form>
            </Box >
        </>
    )
}

export default ApiSearch;