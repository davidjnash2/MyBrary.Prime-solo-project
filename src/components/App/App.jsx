import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ApiSearch from '../ApiSearch/ApiSearch';
import SearchList from '../SearchList/SearchList';
import LibraryList from '../LibraryList/LibraryList';
import BookDetails from '../BookDetails/BookDetails';
import SignInSide from '../SignInSide/SignInSide';
import BookEditing from '../BookEditing/BookEditing';
import ToRead from '../ToRead/ToRead';
import LibraryBook from '../LibraryBook/LibraryBook';
import OnLoan from '../OnLoan/OnLoan';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/registration" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route
            // shows ApiSearch page at all times (logged in or not)
            exact
            path="/search"
          >
            <ApiSearch />

          </Route>
          <Route
            exact
            path="/results/:id"
          >
            <SearchList />
          </Route>


          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/toRead"
          >
            <ToRead />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows library else shows LoginPage
            exact
            path="/library"
          >
            <LibraryList />
          </ProtectedRoute>


          <ProtectedRoute
            exact
            path="/details/:id" // added :id to allow for useParams hook on this component, to allow for state to persist on refresh
          >
            <BookDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows BookEditing view, with :id to allow useParams
            exact
            path="/edit/:id"
          >
            <BookEditing />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows
            exact
            path="/onLoan"
          >
            <OnLoan />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              // <LoginPage />
              <SignInSide />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>
{/* 
          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route> */}
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
