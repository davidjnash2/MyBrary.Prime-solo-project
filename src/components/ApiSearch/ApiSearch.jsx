import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function ApiSearch() {

    const [search, setSearch] = useState([]);
    const results = useSelector((store) => store.results)
    const dispatch = useDispatch();
    const history = useHistory();

    // ${process.env.key}

    // useEffect(() => {
    //     const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    //     // Use the API key in your component logic
    //     console.log(apiKey);
    // }, [])

    const sendSearch = (event) => {
        event.preventDefault();
        console.log('Client search term is:', search);
        const key=process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&orderBy=relevance&printType=books&key=${key}`)
            .then((response) => {
                console.log(response.data);
                // dispatch({
                //     type: 'FETCH_RESULTS',
                //     payload: response.data
                // })
            })
            .catch((error) => {
                console.log('ERROR IN CLIENT API GET!', error.response);
            });
        // history.push('/results');
    }




    return (
        <>
            <form onSubmit={sendSearch}>
                <input
                    onChange={(event) => setSearch(event.target.value)}
                    type="text"
                    placeholder="Pick a book, any book."
                    value={search}
                />
                <button type="submit">GET TH0SE BOOKS</button>
            </form>
            <p></p>
            {/* {results.map((book, i) => (
                <div key={i}>
                    <img src={results.volumeInfo.imageLinks.thumbnail}></img>
                    <p>Title: {results.volumeInfo.title}</p>
                    <p>Subtitle: CONDITIONALLY RENDER IF NOT AVAILABLE {results.volumeInfo.subtitle}</p>
                    <p>Author: {results.volumeInfo.authors}</p>
                    <p>Publisher: {results.volumeInfo.publisher}</p>
                    <p>Year Published: {results.volumeInfo.publishedDate}</p>
                    <p>Genre: {results.volumeInfo.categories}</p>
                    <p>Pages: {results.volumeInfo.pageCount} </p>
                    <p>Description: {results.volumeInfo.description}</p>
                </div>
            ))} */}
        </>

    )
}

export default ApiSearch;