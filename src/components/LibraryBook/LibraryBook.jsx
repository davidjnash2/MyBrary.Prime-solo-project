import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LibraryBook.css';

function LibraryBook({ userBook }) {

    const [updatedUserBook, setUpdatedUserBook] = useState(userBook);
    const [editing, setEditing] = useState(false);

    const [subtitle, setSubtitle] = useState();
    const [publisher, setPublisher] = useState();
    const [published, setPublished] = useState();
    const [genre, setGenre] = useState();
    const [pages, setPages] = useState();
    const [description, setDescription] = useState();
    const [read, setRead] = useState();
    const [rating, setRating] = useState();
    const [review, setReview] = useState();
    const [borrowed, setBorrowed] = useState();
    const [borrower, setBorrower] = useState();
    const [borrowedDate, setBorrowedDate] = useState();


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
                id: userBook.book_id,
                subtitle: userBook.subtitle,
                publisher: userBook.publisher,
                published: userBook.published,
                genre: userBook.genre,
                pages: userBook.pages,
                description: userBook.description,
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


    function renderYearOptions() {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear;
        const endYear = currentYear - 999;
    
        const options = [];
        for (let year = startYear; year >= endYear; year--) {
            options.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }
        return options;
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

                            <label htmlFor="subtitle">Subtitle:</label>
                            <input
                                onChange={(event) => setSubtitle(event.target.value)}
                                type='text'
                                value={subtitle}
                                placeholder={userBook.subtitle}
                            />

                            <p>Author: {userBook.author}</p>


                            <label htmlFor="publisher">Publisher:</label>
                            <input
                                onChange={(event) => setPublisher(event.target.value)}
                                type='text'
                                value={publisher}
                                placeholder={userBook.publisher}
                            />

                            <label htmlFor="published">Published:</label>
                            <select onChange={(event) => setPublished(event.target.value)} value={published}>
                                {renderYearOptions()}
                            </select>



                            <label htmlFor="genre">Genre:</label>
                            <input
                                onChange={(event) => setGenre(event.target.value)}
                                type='text'
                                value={genre}
                                placeholder={userBook.genre}
                            />


                            <label htmlFor="pages">Pages:</label>
                            <input
                                onChange={(event) => setPages(event.target.value)}
                                type='number'
                                value={pages}
                                placeholder={userBook.pages}
                            />

                            <p>ISBN: {userBook.isbn}</p>

                            <label htmlFor="description">Description:</label>
                            <input
                                onChange={(event) => setDescription(event.target.value)}
                                type='text'
                                value={description}
                                placeholder={userBook.description}
                            />

                            <h2>Your info</h2>

                            {/* yes/no toggle box here
                            <label className="switch">
                                <input
                                    onChange={(event) => setRead(event.target.checked)}
                                    type="checkbox"
                                    value={read} />
                                <span className="slider round"></span>
                            </label>
                            <p>Read it? {userBook.read_status}</p> */}


                            <label htmlFor="read">Read?</label>
                            <input
                                onChange={(event) => setRead(event.target.value)}
                                type='text'
                                value={read}
                                placholder={userBook.read_status.toString()}
                            />


                            {/* need to add slider or stars for rating */}
                            <label htmlFor="rating">Rating:</label>
                            {/* <input
                                onChange={(event) => setComments(event.target.value)}
                                type='text'
                                value={description}
                                placeholder={userBook.rating}
                            /> */}
                            <input
                                onChange={(event) => setRating(event.target.value)}
                                type='number'
                                min='0'
                                max='5'
                                value={rating}
                                placeholder={userBook.rating}
                            />









                            <label htmlFor="review">Review:</label>
                            <input
                                onChange={(event) => setReview(event.target.value)}
                                type='text'
                                value={review}
                                placholder={userBook.review}
                            />


                            {/* yes/no toggle box here, too
                                and if yes, then render the borrowed data fields below */}


                            <label htmlFor="borrowed">Borrowed:</label>
                            <input
                                onChange={(event) => setBorrowed(event.target.value)}
                                type='text'
                                value={borrowed}
                                placeholder={userBook.borrowed.toString()}
                            />
                            {/* <label>
                                <input
                                    onChange={(event) => setBorrowed(event.target.checked)}
                                    className="switch"
                                    type="checkbox"
                                    value={borrowed} />
                                <span class="slider round"></span>
                            </label> */}







                            <label htmlFor="borrower">Borrower:</label>
                            <input
                                onChange={(event) => setBorrower(event.target.value)}
                                type='text'
                                value={borrower}
                                placeholder={userBook.borrower}
                            />


                            <label htmlFor="borrowed_date">Borrowed date:</label>
                            <input
                                type="date"
                                id="borrowed_date"
                                value={borrowedDate}
                                onChange={(event) => setBorrowedDate(event.target.value)}
                            />

                            {/* <label htmlFor="borrowed_date">Borrowed date:</label>
                            use MUI datepicker here
                            <input
                                onChange={(event) => setBorrowedDate(event.target.value)}
                                type='text'
                                value={borrowedDate}
                                placeholder={userBook.borrowed_date}
                            /> */}

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