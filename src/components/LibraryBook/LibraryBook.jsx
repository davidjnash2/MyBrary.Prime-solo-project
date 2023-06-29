import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LibraryBook({ userBook }) {

    const dispatch = useDispatch();

    const deleteUserBook = () => {

        console.log('in deleteUserBook');

        dispatch({
            type: 'DELETE_USER_BOOK',
            payload: userBook.id
        });
    }

    // const updateUserBook = () => {
    //     console.log('in updateUserBook');

    //     dispatch({
    //         type: 'UPDATE_USER_BOOK',
    //         payload: {
    //             book.id,
    //             read_status: ,
    //             rating: ,
    //             review: ,
    //             borrowed: ,
    //             borrowed_date: ,
    //             borrower: ,
    //         }
    //     });
    // }


    return (
        <>
            <div>
                <img src={userBook.cover_url} />
                <p>Title: {userBook.title}</p>
                <p>Subtitle: {userBook.subtitle}</p>
                <p>Author: {userBook.author}</p>
                <p>Publisher: {userBook.publisher}</p>
                <p>Published: {userBook.published}</p>
                <p>Genre: {userBook.genre}</p>
                <p>Pages: {userBook.pages}</p>
                <p>ISBN: {userBook.isbn}</p>
                <p>Description: {userBook.description}</p>
            </div >
            <button name="delete" onClick={deleteUserBook}>DELETE BOOK</button>
            {/* <button name="update" onClick={updateUserBook}>UPDATE BOOK</button> */}
        </>
    )
}

export default LibraryBook;