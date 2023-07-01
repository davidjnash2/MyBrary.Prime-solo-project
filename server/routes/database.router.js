const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const userLibraryQuery = `
      SELECT "user"."username",
      "user_book"."id",
      "user_book"."read_status",
      "user_book"."rating",
      "user_book"."review",
      "user_book"."borrowed",
      "user_book"."borrowed_date",
      "user_book"."borrower",
      "user_book"."time_added",
      "user_book"."book_id",
      "book"."id",
      "book"."cover_url",
      "book"."title",
      "book"."subtitle",
      "book"."author",
      "book"."publisher",
      "book"."published",
      "book"."genre",
      "book"."pages",
      "book"."description",
      "book"."isbn"
      FROM "user"
      JOIN user_book
      ON "user"."id" = "user_book"."user_id"
      JOIN book
      ON "user_book"."book_id" = "book"."id"
      WHERE "user"."id" = $1
      ORDER BY "book"."title"
    ;`
      ;
    pool.query(userLibraryQuery, [userId])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('ERROR IN SERVER GET', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403)
  }
});

// POST route
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('IN SERVER POST, AND req.body is:', req.body);
    const book = req.body; 
    const postBookQuery = `INSERT INTO book (
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING "id";
  `;
    pool.query(postBookQuery, [
      book.cover_url,
      book.title,
      book.subtitle,
      book.author,
      book.publisher,
      book.published,
      book.genre,
      book.pages,
      book.description,
      book.isbn]) // book properties from req.body
      .then((bookResult) => {
        const newBookId = bookResult.rows[0].id;
        const userBookQuery = `
        INSERT INTO "user_book" (user_id, book_id)
        VALUES ($1, $2);
        `;
        pool.query(userBookQuery, [req.user.id, newBookId])
          .then((response) => {
            res.sendStatus(202);
          })
          .catch((error) => {
            console.log('ERROR LINKING USER BOOK', error);
            res.sendStatus(500);
          });
      })
      .catch((error) => {
        console.log('ERROR IN SERVER POST', error);
      });
  } else {
    res.sendStatus(400);
  }
});

// DELETE route
router.delete('/:id', (req, res) => {
  console.log('IN SERVER DELETE ROUTE, and req.params is:', req.params);
  if (req.isAuthenticated()) {
    const deleteId = req.params.id;
    const deleteUserBookQuery = `
    DELETE FROM "user_book"
    WHERE "id" = $1
    ;`
      ;
    pool.query(deleteUserBookQuery, [deleteId])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('ERROR IN DELETE', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403)
  }
});


router.put('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('IN SERVER PUT, AND req.body is:', req.body);
    const updateInfo = req.body; // will probably need to define properties
    const updateBookQuery = `
      UPDATE book 
      SET 
      subtitle = $1,
      publisher = $2,
      published = $3,
      genre = $4,
      pages = $5,
      description = $6
      WHERE book.id = $7;`;
      
      const updateUserBookQuery = `
      UPDATE user_book 
      SET 
      read_status = $1,
      rating = $2,
      review = $3,
      borrowed = $4,
      borrowed_date = $5,
      borrower = $6
      WHERE user_book.book_id = $7;`;

    pool.query(updateBookQuery, [
      updateInfo.subtitle,
      updateInfo.publisher,
      updateInfo.published,
      updateInfo.genre,
      updateInfo.pages,
      updateInfo.description,
      updateInfo.id]) 
      .then((response) => {
        res.sendStatus(202);
      })
      .catch((error) => {
        console.log('ERROR IN SERVER updateBookQuery PUT', error);
      });

      pool.query(updateUserBookQuery, [
        updateInfo.read_status,
        updateInfo.rating,
        updateInfo.review,
        updateInfo.borrowed,
        updateInfo.borrowed_date,
        updateInfo.borrower,
        updateInfo.id])
            .then((response) => {
              res.sendStatus(202);
            })
            .catch((error) => {
              console.log('ERROR IN SERVER updateUserBookQuery PUT', error);
              res.sendStatus(500);
            });

  } else {
    res.sendStatus(400);
  }



});





module.exports = router;
