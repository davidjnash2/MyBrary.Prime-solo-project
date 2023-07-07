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
            <h1>The results are in!</h1>
            <div className="search-results">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Grid
                        marginTop="120px"
                        container
                        spacing={2}
                        justifyContent="flex-start"
                        sx={{
                            marginTop: "120px",
                            marginBottom: "60px",
                            width: "90%",
                        }}
                    >
                        {filteredResults?.map((book, i) => (
                            <Grid item xs={12} sm={6} md={6} lg={2} xl={2} key={i}>
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