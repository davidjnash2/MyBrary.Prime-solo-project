import React from 'react';
import { useSelector } from "react-redux";
import SearchBook from '../SearchBook/SearchBook';
import { Grid, Card, Paper, makeStyles } from '@mui/material';

function SearchList() {

    // access search results from global state via store
    const results = useSelector((store) => store.results);

    // map over results array, making sure there are actually
    //  values present before mapping so as not to crash DOM
    return (
        <>
        <Grid container spacing={2} justifyContent="center">
            {results && results.items?.map((book, i) => (
                <Grid item xs={12} sm={6} md={5} lg={2} xl={2} key={i}>
                    <SearchBook book={book} />
                </Grid>
            ))}
            </Grid>
        </>
    )
}

export default SearchList;