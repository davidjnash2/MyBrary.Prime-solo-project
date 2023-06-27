import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SearchBook({book}) {

//     // FOR BLOCKING ADD OF BOOK ALREADY IN LIBRARY:
//     // USE SERVER GET TO HOLD LIBRARY IN STATE, LOOP THROUGH ISBN 
//     // VALUES TO ENSURE NOT MATCH WITH ATTEMPTED ADD
//     // IF SO, ALLOW,
//     // IF NOT, NO


    // this will add searched book result to client library
    // need to also pull in book ISBN numbers to see if match
    // will also need to present user with some sort of 
    // alert/confirmation(breadcrumb?) that book was added, or 
    // same if not able to add

    // add unique movie details to global state, POST those 
    // state values; look to feedback repo for reference

    const addBook = () => {

    }
    return (
        <>
            <img src={book && book.volumeInfo.imageLinks.thumbnail}></img>
            <p>Title: {book && book.volumeInfo.title}</p>
            <p>Subtitle: CONDITIONALLY RENDER IF NOT AVAILABLE {book && book.volumeInfo.subtitle}</p>
            <p>Author: {book && book.volumeInfo.authors}</p>
            <p>Publisher: {book && book.volumeInfo.publisher}</p>
            <p>Year Published: {book && book.volumeInfo.publishedDate}</p>
            <p>Genre: {book && book.volumeInfo.categories}</p>
            <p>Pages: {book && book.volumeInfo.pageCount} </p>
            <p>Description: {book && book.volumeInfo.description}</p>
        </>
    )
}

export default SearchBook;