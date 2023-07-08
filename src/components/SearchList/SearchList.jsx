import React from 'react';
import { useSelector } from "react-redux";
import SearchBook from '../SearchBook/SearchBook';
import { Box, Grid, Card, Paper, makeStyles } from '@mui/material';
import './SearchList.css';
function SearchList() {

    // access search results from global state via store
    const results = useSelector((store) => store.results);


    const filteredResults = results.items?.filter((book) => {
        return (
            book &&
            (book?.volumeInfo?.industryIdentifiers?.[0]?.type === 'ISBN_13' ||
                (book?.volumeInfo?.industryIdentifiers?.[1] &&
                    book?.volumeInfo?.industryIdentifiers?.[1]?.type === 'ISBN_13')) &&
            book?.volumeInfo?.imageLinks !== undefined &&
            book?.volumeInfo?.title !== undefined &&
            book?.volumeInfo?.authors !== undefined
        );
    });
    // map over results array, making sure there are actually
    //  values present before mapping so as not to crash DOM
    return (
        <>
        <div className="search-results">
            <h1>The results are in!</h1>
            <h2>Click book to add it to your MyBrary.</h2>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    // minHeight="100vh"
                    minHeight="400px"
                >
                    <Grid
                        container
                        spacing={2}
                        justifyContent="flex-start"
                        sx={{
                            marginTop: "25x",
                            marginBottom: "60px",
                            width: "90%",
                        }}
                    >
                        {filteredResults?.map((book, i) => (
                            <Grid item xs={12} sm={6} md={3} lg={3} xl={2} key={i}>
                                <SearchBook book={book} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </>
    )
}

export default SearchList;