import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import SearchBook from '../SearchBook/SearchBook';

function SearchList() {


    const results = useSelector((store) => store.results);
    const dispatch = useDispatch();


    

    return (
        <>
        <p></p>
            {results && results.items?.map((book, i) => (
                <div key={i}>
                    <SearchBook book={book}/>
                    {/* <img src={book && book.volumeInfo.imageLinks.thumbnail}></img>
                    <p>Title: {book && book.volumeInfo.title}</p>
                    <p>Subtitle: CONDITIONALLY RENDER IF NOT AVAILABLE {book && book.volumeInfo.subtitle}</p>
                    <p>Author: {book && book.volumeInfo.authors}</p>
                    <p>Publisher: {book && book.volumeInfo.publisher}</p>
                    <p>Year Published: {book && book.volumeInfo.publishedDate}</p>
                    <p>Genre: {book && book.volumeInfo.categories}</p>
                    <p>Pages: {book && book.volumeInfo.pageCount} </p>
                    <p>Description: {book && book.volumeInfo.description}</p> */}
                </div>
            ))}
            </>
    )
}

export default SearchList;