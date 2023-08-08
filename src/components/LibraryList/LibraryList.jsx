import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibraryBook from '../LibraryBook/LibraryBook';
import { Box, Grid, Card, Paper, makeStyles } from '@mui/material'

function LibraryList() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const library = useSelector(store => store.library);

    useEffect(() => {
        dispatch({
            type: 'FETCH_LIBRARY'
        })
    }, []);

    // this loading block all to ensure dom doesn't crash if data isn't back yet from 
    // the above use effect when page renders
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an asynchronous API call to fetch book details
        setTimeout(() => {
            // Set isLoading to false once the data is fetched
            setIsLoading(false);
        }, 75);
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
                <h1 className="centered-content">{user.username}'s MyBrary</h1>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    // minHeight="100vh"
                    minHeight="400px"
                >
                    <Grid
                        container
                        spacing={6}
                        justifyContent="flex-start"
                        sx={{
                            marginTop: "25px",
                            marginBottom: "60px",
                            width: "95%",
                        }}
                    >
                        {library && library.map((userBook, i) => (
                            <Grid item xs={12} sm={6} md={3} lg={2} xl={2} key={i}>
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