const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

// POST route
// will be using 10 properties per entry
// will probably need to break apart req.body to ensure proper addition
// as i'm thinking this throught right this moment, realizing I may have to 
// re-evaluate either my DB schema, or modifiy how this POST will work,
// b/c need to get book info to book table, and also create a line in the 
// user_book table
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('IN SERVER POST, AND req.body is:', req.body);
    const book = req.body; // will probably need to define properties
    const postQuery = `INSERT INTO book (
      cover_url, 
      title,
      subtitle,
      author,
      publisher,
      published,
      genre,
      pages,	
      description,
      isbn)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);

  `;
    pool.query(postQuery, [book]) // will need to define book properties from req.body
      .then((response) => {
        res.sendStatus(202);
      })
      .catch((error) => {
        console.log('ERROR IN SERVER POST', error);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
