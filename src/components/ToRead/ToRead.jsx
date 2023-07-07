import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibraryBook from '../LibraryBook/LibraryBook';
import { Box, Grid, Card, Paper } from '@mui/material'
import './ToRead.css';



function ToRead() {

  const dispatch = useDispatch();
  const library = useSelector(store => store.library);


  const selectUnreads = () => {
    const unreadBooks = [];
    for (const userBook of library) {
      if (userBook.read_status !== true) {
        unreadBooks.push(userBook);
      }
    }
    console.log('unreadBooks are:', unreadBooks);
    return unreadBooks;
  }

  const unreadBooks = selectUnreads();

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

  // map over new unread array
  return (
    <>
    <div className="to-reads">

      <h1 className="centered-content">Where to begin?</h1>
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
            marginTop: "30px",
            marginBottom: "60px",
            // marginLeft: "10px",
            // marginRight: "10px",
            width: "90%",
        }}
        >
          {unreadBooks.map((userBook, i) => (
            <Grid item xs={12} sm={5} md={5} lg={5} xl={2} key={i}>
              <LibraryBook userBook={userBook} />
            </Grid>
          ))}
        </Grid>
      </Box>
      </div>
    </>
  )
}

export default ToRead;