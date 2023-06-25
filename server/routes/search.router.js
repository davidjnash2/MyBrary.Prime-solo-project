const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


// GET route to GoogleBooks API
// q=user search terms
// restrict to max 10 results
// ordered by relevance
// limiting to books only
router.get('/', (req, res) => {
  console.log('IN SERVER API GET, AND req.body IS:', req.body);
  const userSearch = req.body;
  axios.get(`https://https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=10&orderBy=relevance&printType=books&key=${process.env.key}`)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log('ERROR IN SERVER API GET!', error);
    })
});


module.exports = router;