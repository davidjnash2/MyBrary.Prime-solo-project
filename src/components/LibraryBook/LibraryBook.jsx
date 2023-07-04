import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LibraryBook.css';

function LibraryBook({ userBook }) {

    const history = useHistory();
    const dispatch = useDispatch();

    // user click on book will bring to details page for that book
    const clickCover = () => {
        console.log('clicked userBook.book_id is', userBook.book_id);
        history.push(`/details/${userBook.book_id}`)
        dispatch({
            type: 'FETCH_DETAILS',
            payload: userBook.book_id
        })
    }

    return (
        <>
            <div onClick={clickCover}>
                <img src={userBook.cover_url} />
                <p>Title: {userBook.title}</p>
                <p>Author: {userBook.author}</p>
            </div>
        </>
    )
}


export default LibraryBook;