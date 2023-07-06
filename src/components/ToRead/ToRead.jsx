import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LibraryBook from '../LibraryBook/LibraryBook';
import { Grid, Card, Paper } from '@mui/material'




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
      <h1>Where shall we begin?</h1>
      <Grid 
      container 
      spacing={2} 
      justifyContent="flex-start"
      >
        {unreadBooks.map((userBook, i) => (
          <Grid item xs={12} sm={6} md={5} lg={2} xl={2} key={i}>
            <LibraryBook userBook={userBook} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ToRead;