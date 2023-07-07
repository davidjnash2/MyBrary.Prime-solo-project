import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibraryBook from '../LibraryBook/LibraryBook';
import { Box, Grid, Card, Paper, makeStyles } from '@mui/material'

function LibraryList() {

    const dispatch = useDispatch();

    const library = useSelector(store => store.library);

    useEffect(() => {
        dispatch({
            type: 'FETCH_LIBRARY'
        })
    }, []);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an asynchronous API call to fetch book details
        setTimeout(() => {
            // Set isLoading to false once the data is fetched
            setIsLoading(false);
        }, 25);
    }, []); // Empty dependency array to run the effect only once

    // ...

    if (isLoading) {
        // Render a loading state or a placeholder component
        return <div>Loading...</div>;
    }

    // map over library array, making sure there are actually
    //  values present before mapping so as not to crash DOM
    return (
        <>
            <div className="user-library">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Grid
                        container 
                        spacing={2}
                        justifyContent="flex-start"
                        sx={{
                            marginTop: "120px",
                            marginBottom: "60px",
                            // marginLeft: "10px",
                            // marginRight: "10px",
                            width: "90%",
                        }}
                    >
                        {library && library.map((userBook, i) => (
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={2} key={i}>

                                <LibraryBook userBook={userBook} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </>
    )
}

export default LibraryList;