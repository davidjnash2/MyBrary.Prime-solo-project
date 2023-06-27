import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SearchBook({ book }) {

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

    // add unique book details to global state, POST those 
    // state values; look to feedback repo for reference

    // "click to confirm" alert/notification for adding


    // isbn= book.volumeInfo.industryIdentifiers[0].identifier

    const addBook = () => {

    }

    // using conditional rendering here to only display volumes with ISBNs assigned,
    // so that user will only see volumes with that value, and will allow me to double-check
    // it against their libary to prevent duplicate entries
    // also using && AND operators to ensure that any missing volume data doesn't render an 
    // empty field; title and author are assumed a given (perhaps to my later detriment)
    return (
        <>
            {(book?.volumeInfo?.industryIdentifiers[0]?.type === 'ISBN_13' || book?.volumeInfo?.industryIdentifiers[1]?.type === 'ISBN_13')
                && book?.volumeInfo?.imageLinks
                && (
                    <div>
                        <img
                            src={book?.volumeInfo?.imageLinks?.thumbnail}
                            onClick={addBook}>
                        </img>
                        {book.volumeInfo.title && <p>Title: {book.volumeInfo.title}</p>}
                        {book.volumeInfo.subtitle && <p>Subtitle: {book.volumeInfo.subtitle}</p>}
                        {book.volumeInfo.authors && <p>Author: {book.volumeInfo.authors}</p>}
                        {book.volumeInfo.publisher && <p>Publisher: {book.volumeInfo.publisher}</p>}
                        {book.volumeInfo.publishedDate && <p>Published: {book.volumeInfo.publishedDate}</p>}
                        {book.volumeInfo.categorie && <p>Genre: {book.volumeInfo.categories}</p>}
                        {book.volumeInfo.pageCount && book.volumeInfo.pageCount !== 0 && <p>Pages: {book.volumeInfo.pageCount}</p>}
                        {book.volumeInfo.industryIdentifiers[0].type === 'ISBN_13' ?
                            <p>ISBN: {book.volumeInfo.industryIdentifiers[0].identifier}</p>
                            :
                            <p>ISBN: {book.volumeInfo.industryIdentifiers[1].identifier}</p>
                        }
                        {book.volumeInfo.description && <p>Description: {book.volumeInfo.description}</p>}
                    </div>
                )}
        </>
    )
}

export default SearchBook;