const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


// GET route to GoogleBooks API
// q=user search terms
// originally restricted to only max 10 results, but after much refinement of rendering desired information to DOM,
// increased to max 20
// ordered by relevance
// limiting to books only
router.get('/:searchTerm', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('in server api GET, and req.params is:', req.params);
    const searchTerm = req.params.searchTerm;
    const key = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20&orderBy=relevance&printType=books&key=${key}`)
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        console.log('ERROR IN SERVER API GET!', error);
      });
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;