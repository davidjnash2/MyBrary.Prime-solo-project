import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);
  console.log('user is:', user);

  return (
    <div className="nav">
      <Link to="/login">
        <h1 className="nav-title">MyBrary</h1>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          <>
            {/* If there's no user, show login/registration links */}
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
            {/* <Link className="navLink" to="/search">
              Search
            </Link> */}
            <Link className="navLink" to="/about">
              About
            </Link>
          </>
        )}
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
            <Link className="navLink" to="/search">
              Search
            </Link>
            <Link className="navLink" to="/library">
              Mybrary
            </Link>
            <Link className="navLink" to="/toRead">
              To Read
            </Link>
            <Link className="navLink" to="/onLoan">
              On Loan
            </Link>
            <Link className="navLink" to="/about">
              About
            </Link>
            <LogOutButton className="navLink" />


            {/* started building avatar render field here, commented out due to 
            time constraints on getting to functional; keeping for future reference/use */}
            {/* <Avatar className="avatar"
              alt="user avatar"
              src="unsplash.com/photos/FTfjMijq-Ws"
              sx={{ width: 56, height: 56 }}
            /> */}
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
