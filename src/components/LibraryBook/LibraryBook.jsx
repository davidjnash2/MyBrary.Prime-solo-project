import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LibraryBook({ userBook }) {

    const [updatedUserBook, setUpdatedUserBook] = useState(userBook);
    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();

    const switchEditing = () => {
        setEditing(!editing);
    }



    const deleteUserBook = (event) => {
        event.preventDefault();
        console.log('in deleteUserBook');
        dispatch({
            type: 'DELETE_USER_BOOK',
            payload: userBook.id
        });
    }

    const updateUserBook = (event) => {
        event.preventDefault();
        console.log('in updateUserBook');

        dispatch({
            type: 'UPDATE_USER_BOOK',
            payload: {
                id: userBook.id,
                read_status: userBook.read_status,
                rating: userBook.rating,
                review: userBook.review,
                borrowed: userBook.borrowed,
                borrowed_date: userBook.borrowed_date,
                borrower: userBook.borrower,
            }
        });
        switchEditing();
    }


    return (
        <>
            {editing ? (
                <>
                    <div>
                        <form onSubmit={updateUserBook}>
                            <h2>Book Info</h2>
                            <img src={userBook.cover_url} />
                            <p>Title: {userBook.title}</p>

                            <input
                                placeholder="Subtitle"
                            />

                            <p>Author: {userBook.author}</p>

                            <input
                                placholder="Publisher"
                            />

                            <input
                                placeholder="Published"
                            />

                            <input
                                placeholder="Genre"
                            />

                            <input
                                placeholder="Pages"
                            />

                            <p>ISBN: {userBook.isbn}</p>

                            <input placeholder={userBook.description} />

                            <h2>Your info</h2>

                            {/* yes/no toggle box here */}
                            <p>Read it? {userBook.read_status}</p>

                            <input
                                placeholder={userBook.rating}
                            />

                            <input
                                placholder={userBook.review}
                            />


                            {/* yes/no toggle box here, too
                                and if yes, then render the borrowed data fields below */}
                            
                            Borrowed?
                            <input
                    
                            />

                            <input
                                placeholder={userBook.borrower}
                            />

                            <input
                                placeholder={userBook.borrowed_date}
                            />

                            <button
                                type="submit"
                            >
                                SAVE CHANGES
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <h2>Book Info</h2>

                        <img src={userBook.cover_url} />

                        <p>Title: {userBook.title}</p>

                        {(userBook.subtitle === undefined || userBook.subtitle === null || userBook.subtitle === 0) ? (
                            <p>Subtitle: n/a</p>
                        ) : (
                            <p>Subtitle: {userBook.subtitle}</p>
                        )}

                        <p>Author: {userBook.author}</p>

                        {(userBook.publisher === undefined || userBook.publisher === null || userBook.publisher === 0) ? (
                            <p>Publisher: n/a</p>
                        ) : (
                            <p>Publisher: {userBook.publisher}</p>
                        )}

                        {(userBook.published === undefined || userBook.published === null || userBook.published === 0) ? (
                            <p>Published: n/a</p>
                        ) : (
                            <p>Published: {userBook.published}</p>
                        )}

                        {(userBook.genre === undefined || userBook.genre === null || userBook.genre === 0) ? (
                            <p>Genre: n/a</p>
                        ) : (
                            <p>Genre: {userBook.genre}</p>
                        )}

                        {(userBook.pages === undefined || userBook.pages === null || userBook.pages === 0) ? (
                            <p>Pages: n/a</p>
                        ) : (
                            <p>Pages: {userBook.pages}</p>
                        )}

                        <p>ISBN: {userBook.isbn}</p>

                        {(userBook.description === undefined || userBook.description === null || userBook.description === 0) ? (
                            <p>Description: n/a</p>
                        ) : (
                            <p>Description: {userBook.description}</p>
                        )}

                        <h2>Your info</h2>

                        {/* yes/no toggle box here */}
                        <p>Read it? {userBook.read_status}</p>

                        {(userBook.rating === undefined || userBook.rating === null || userBook.rating === 0) ? (
                            <p>Like it?  n/a</p>
                        ) : (
                            <p>Like it? {userBook.rating}</p>
                        )}

                        {(userBook.review === undefined || userBook.review === null || userBook.review === 0) ? (
                            <p>What'd you think? n/a</p>
                        ) : (
                            <p>What'd you think? {userBook.review}</p>
                        )}

                        {/* yes/no toggle box here, too
                                and if yes, then render the borrowed data fields below */}
                        <p>Somebody got it currently? {userBook.borrowed}</p>

                        <p>Who? {userBook.borrower}</p>
                        <p>Since when? {userBook.borrowed_date}</p>


                        <button
                            type="button"
                            onClick={switchEditing}
                        >
                            EDIT
                        </button>
                        <button
                            name="delete"
                            onClick={deleteUserBook}
                        >
                            DELETE BOOK
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default LibraryBook;