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

    // using conditional rendering, optional chaining, AND operators to ensure that only results which contain
    // the information I want for POST is accessible and available as choice options for user
    return (
        <>
            {book &&
                (book?.volumeInfo?.industryIdentifiers?.[0]?.type === 'ISBN_13' ||
                    (book?.volumeInfo?.industryIdentifiers?.[1] && book?.volumeInfo?.industryIdentifiers?.[1]?.type === 'ISBN_13')) &&
                book?.volumeInfo?.imageLinks &&
                book?.volumeInfo?.title !== undefined &&
                book?.volumeInfo?.subtitle !== undefined &&
                book?.volumeInfo?.authors !== undefined &&
                book?.volumeInfo?.publisher !== undefined &&
                book?.volumeInfo?.publishedDate !== undefined &&
                book?.volumeInfo?.categories !== undefined &&
                book?.volumeInfo?.pageCount !== undefined &&
                book?.volumeInfo?.description !== undefined && (
                    <div>
                        <img
                            src={book?.volumeInfo?.imageLinks?.thumbnail}
                            onClick={addBook}>
                        </img>
                        {book?.volumeInfo?.title && book?.volumeInfo?.title !== 0 && book?.volumeInfo?.title !== undefined && <p>Title: {book.volumeInfo.title}</p>}
                        {book?.volumeInfo?.subtitle && book?.volumeInfo?.subtitle !== 0 && book?.volumeInfo?.subtitle !== undefined && <p>Subtitle: {book.volumeInfo.subtitle}</p>}
                        {book?.volumeInfo?.authors && book?.volumeInfo?.authors !== 0 && book?.volumeInfo?.authors !== undefined && <p>Author: {book.volumeInfo.authors}</p>}
                        {book?.volumeInfo?.publisher && book?.volumeInfo?.publisher !== 0 && book?.volumeInfo?.publisher !== undefined && <p>Publisher: {book.volumeInfo.publisher}</p>}
                        {book?.volumeInfo?.publishedDate && book?.volumeInfo?.publishedDate !== 0 && book?.volumeInfo?.publishedDate !== undefined && <p>Published: {book.volumeInfo.publishedDate}</p>}
                        {book?.volumeInfo?.categories && book?.volumeInfo?.categories !== 0 && book?.volumeInfo?.categories !== undefined && <p>Genre: {book.volumeInfo.categories}</p>}
                        {book?.volumeInfo?.pageCount && book?.volumeInfo?.pageCount !== 0 && book?.volumeInfo?.pageCount !== undefined && <p>Pages: {book.volumeInfo.pageCount}</p>}
                        {book?.volumeInfo?.industryIdentifiers[0]?.type === 'ISBN_13' ?
                            <p>ISBN: {book.volumeInfo.industryIdentifiers[0]?.identifier}</p>
                            :
                            <p>ISBN: {book.volumeInfo.industryIdentifiers[1]?.identifier}</p>
                        }
                        {book?.volumeInfo?.description && book?.volumeInfo?.description !== 0 && book?.volumeInfo?.description !== undefined && <p>Description: {book.volumeInfo.description}</p>}
                    </div>
                )}
        </>
    )
}

export default SearchBook;