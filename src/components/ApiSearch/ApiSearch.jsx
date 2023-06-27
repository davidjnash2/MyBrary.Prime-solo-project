import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchList from '../SearchList/SearchList';

function ApiSearch() {

    const [search, setSearch] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const results = useSelector((store) => store.results);

    const sendSearch = (event) => {
        event.preventDefault();
        console.log('Client search term is:', search);
        dispatch({
            type: 'FETCH_RESULTS',
            payload: search
        })
       
    }



    return (
        <>
            <form onSubmit={sendSearch}>
                <input
                    onChange={(event) => setSearch(event.target.value)}
                    type="text"
                    placeholder="Pick a book, any book."
                    required
                    value={search}
                />
                <button type="submit">GET THOSE BOOKS</button>
            </form>
            <SearchList />
            {/* <p></p>
            {results && results.items?.map((book, i) => (
                <div key={i}> */}
                    {/* <img src={book && book.volumeInfo.imageLinks.thumbnail}></img>
                    <p>Title: {book && book.volumeInfo.title}</p>
                    <p>Subtitle: CONDITIONALLY RENDER IF NOT AVAILABLE {book && book.volumeInfo.subtitle}</p>
                    <p>Author: {book && book.volumeInfo.authors}</p>
                    <p>Publisher: {book && book.volumeInfo.publisher}</p>
                    <p>Year Published: {book && book.volumeInfo.publishedDate}</p>
                    <p>Genre: {book && book.volumeInfo.categories}</p>
                    <p>Pages: {book && book.volumeInfo.pageCount} </p>
                    <p>Description: {book && book.volumeInfo.description}</p> */}
                {/* </div>
            ))} */}
        </>
    )
}

export default ApiSearch;