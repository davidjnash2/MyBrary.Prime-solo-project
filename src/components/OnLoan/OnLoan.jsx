import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibraryBook from '../LibraryBook/LibraryBook';
import { Box, Grid, Card, Paper } from '@mui/material'
import './OnLoan.css';



function OnLoan() {

    const dispatch = useDispatch();
    const library = useSelector(store => store.library);


    const selectLoaners = () => {
        const loaners = [];
        for (const userBook of library) {
            if (userBook.borrowed === true) {
                loaners.push(userBook);
            }
        }
        console.log('loaners are:', loaners);
        return loaners;
    }

    const loaners = selectLoaners();

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
        }, 50);
    }, []); // Empty dependency array to run the effect only once

    // ...

    if (isLoading) {
        // Render a loading state or a placeholder component
        return <div>Loading...</div>;
    }


    if (loaners.length === 0) {
        return (
            <div className="out-on-loan">
                <h1 className="centered-content">Out on Loan</h1>
                <h2>Nothing out currently.</h2>
            </div>)
    }

    // when time allows, will build out this function to allow 
    // user to click cover on this view to return book to livary
    // const returnBook = () => {

    // }


    // map over new loaners array
    return (
        <>
            <div className="out-on-loan">
                <h1 className="centered-content">Out on Loan</h1>
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
                            marginTop: "25px",
                            marginBottom: "60px",
                            width: "90%",
                        }}
                    >
                        {loaners.map((userBook, i) => (
                            <Grid item xs={12} sm={4} md={4} lg={3} xl={3} key={i}>
                                <LibraryBook userBook={userBook}  onClickCover={returnBook}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </>
    )
}

export default OnLoan;