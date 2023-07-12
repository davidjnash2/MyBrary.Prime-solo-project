import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibraryBook from '../LibraryBook/LibraryBook';
import { Box, Grid } from '@mui/material'
import './ToRead.css';



function ToRead() {

  const dispatch = useDispatch();
  const library = useSelector(store => store.library);

  // looping through library state to find books marked as not read
  // and pust them into new array unreadBooks
  const selectUnreads = () => {
    const unreadBooks = [];
    for (const userBook of library) {
      if (userBook && !userBook.read_status) {
        unreadBooks.push(userBook);
      }
    }
    console.log('unreadBooks are:', unreadBooks);
    return unreadBooks;
  }

  // declare variable via called function
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

  // message to both alert user there are no unread books, and prevent dom from breaking if nothing here
  if (unreadBooks.length === 0) {
    return (
      <div className="to-reads">
        <h1 className="centered-content">Where to begin?</h1>
        <h2>Congratulations, you've read 'em all!</h2>
      </div>)
  }


  // map over new unreadBooks array
  return (
    <>
      {unreadBooks && unreadBooks.length > 0 && (
        <div className="to-reads">
          <h1 className="centered-content">Where to begin?</h1>
          <Box
            sx={{
              marginTop: "25px",
            }}
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
              {unreadBooks.map((userBook, i) => (
                <Grid item xs={12} sm={4} md={4} lg={3} xl={3} key={i}>
                  <LibraryBook userBook={userBook} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div >
      )}
    </>
  )
}

export default ToRead;