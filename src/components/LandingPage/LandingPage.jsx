import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import ApiSearch from '../ApiSearch/ApiSearch';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            You know all those books you’ve got? The dusty ones 
            moldering away in the corner? And the foot-high stack 
            on your nightstand, waiting to be read? And the ones 
            you’ve lost through the hands of irresponsible friends? 
            Let’s see if we can’t keep better track of all those, shall we?
            With this app, you will easily manage all of those yellowed 
            pages. You will be able to add all your books, view them by cover, 
            sort and search them however you wish, rate and review them as you go, 
            see what you’ve got on the shelf but have forgotten to read, and remember 
            just who’s got your copy of Slaughterhouse-Five. 

          </p>
          <ApiSearch />
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
