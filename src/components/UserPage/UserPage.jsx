import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Card, Paper, makeStyles } from '@mui/material';
import LibraryBook from '../LibraryBook/LibraryBook';
import './UserPage.css';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const library = useSelector((store) => store.library);
  console.log('library is:', library);

  const selectRecents = () => {
    const sortedLibrary = library.sort((a, b) => b.id - a.id);
    console.log('sortedLibrary is:', sortedLibrary);
    const recentBooks = sortedLibrary.slice(0, 5);
    console.log('recentBooks are:', recentBooks);
    return recentBooks;
  }

  const recentBooks = selectRecents();

  useEffect(() => {
    dispatch({
      type: 'FETCH_LIBRARY'
    })
  }, []);

  return (
    <>
      <div className="user-view">
        <div className="centered-content">

          <h1>Welcome back, {user.username}!</h1>
          <p id="mybrary-count">You've got {library.length} books in your MyBrary!</p>
          <div>
            <h3>Your recent additions are...</h3>
            <Grid 
            container 
            spacing={4}
            justifyContent="center"
            // sx={{
            //   marginTop: "25px",
            // }}
            >
              {recentBooks.map((userBook, i) => (
                <Grid item xs={12} sm={6} md={5} lg={2} xl={2} key={i}>
                  <LibraryBook userBook={userBook} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
