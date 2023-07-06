import React from 'react';
import './AboutPage.css';
import { Grid } from '@mui/material';

function AboutPage() {
  return (
    <div className="bio-container">
      <Grid container spacing={2}>
        <Grid container xs={6} className="big-grid">
          <Grid item className="grid-item">
          <h2>Dave Nash</h2>
        <img src="Images/IMG_6499.jpeg" className="me-image"/>
        <p>This about page is all about me!</p>
        </Grid>
     </Grid>
      <Grid container xs={6} className="big-grid">
   
        <h2>Technologies used for this project</h2>
        <ul>
          <li>
            Google Books API
          </li>
          <li>
            React
          </li>
          <li>
            React-Redux
          </li>
          <li>
            Material UI
          </li>
          <li>
            Node.js
          </li>
          <li>
            Express
          </li>
          <li>
            Passport
          </li>
          <li>
            JavaScript
          </li>
          <li>
            PostgreSQL
          </li>
          <li>
            VS Code Editor
          </li>
          <li>
            Axios
          </li>
          <li>
            CSS
          </li>
          <li>
            HTML
          </li>
        </ul>
      </Grid>
      </Grid>
    </div>
  );
}

export default AboutPage;
