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
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('IN SERVER POST, AND req.body is:', req.body);
    const book = req.body;
    const postQuery = `

  `;
    pool.query(postQuery, [])
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
