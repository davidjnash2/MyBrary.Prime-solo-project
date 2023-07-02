import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './BookDetails.css';

function BookDetails({ }) {

    const bookDetails = useSelector(store => store.details);

    console.log('in BookDetails, and bookDetails is:', bookDetails);

    const dispatch = useDispatch();
    const history = useHistory();

    
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


    const switchEditing = () => {
        setEditing(!editing);
    }



    const deleteUserBook = (event) => {
        event.preventDefault();
        console.log('in deleteUserBook, and id to delete is:', bookDetails[0].book_id);
        dispatch({
            type: 'DELETE_USER_BOOK',
            payload: bookDetails[0].book_id
        });
        history.push('/library');
    }

    const updateUserBook = (event) => {
        event.preventDefault();
        console.log('in updateUserBook');

        dispatch({
            type: 'UPDATE_USER_BOOK',
            payload: {
                id: bookDetails[0].book_id,
                subtitle,
                publisher,
                published,
                genre,
                pages,
                description,
                read,
                rating,
                review,
                borrowed,
                borrowedDate,
                borrower,
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
                            <img src={bookDetails[0].cover_url} />
                            <p>Title: {bookDetails[0].title}</p>

                            <label htmlFor="subtitle">Subtitle:</label>
                            <input
                                onChange={(event) => setSubtitle(event.target.value)}
                                type='text'
                                value={subtitle}
                                placeholder={bookDetails[0].subtitle}
                            />

                            <p>Author: {bookDetails[0].author}</p>


                            <label htmlFor="publisher">Publisher:</label>
                            <input
                                onChange={(event) => setPublisher(event.target.value)}
                                type='text'
                                value={publisher}
                                placeholder={bookDetails[0].publisher}
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
                                placeholder={bookDetails[0].genre}
                            />


                            <label htmlFor="pages">Pages:</label>
                            <input
                                onChange={(event) => setPages(event.target.value)}
                                type='number'
                                value={pages}
                                placeholder={bookDetails[0].pages}
                            />

                            <p>ISBN: {bookDetails[0].isbn}</p>

                            <label htmlFor="description">Description:</label>
                            <input
                                onChange={(event) => setDescription(event.target.value)}
                                type='text'
                                value={description}
                                placeholder={bookDetails[0].description}
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
                            <p>Read it? {bookDetails.read_status}</p> */}


                            <label htmlFor="read">Read?</label>
                            <input
                                onChange={(event) => setRead(event.target.value)}
                                type='text'
                                value={read}
                                placholder={bookDetails[0].read_status.toString()}
                            />


                            {/* need to add slider or stars for rating */}
                            <label htmlFor="rating">Rating:</label>
                            {/* <input
                                onChange={(event) => setComments(event.target.value)}
                                type='text'
                                value={rating}
                                placeholder={bookDetails[0].rating}
                            /> */}
                            <input
                                onChange={(event) => setRating(event.target.value)}
                                type='number'
                                min='0'
                                max='5'
                                value={rating}
                                placeholder={bookDetails[0].rating}
                            />









                            <label htmlFor="review">Review:</label>
                            <input
                                onChange={(event) => setReview(event.target.value)}
                                type='text'
                                value={review}
                                placholder={bookDetails[0].review}
                            />


                            {/* yes/no toggle box here, too
                                and if yes, then render the borrowed data fields below */}


                            <label htmlFor="borrowed">Borrowed:</label>
                            <input
                                onChange={(event) => setBorrowed(event.target.value)}
                                type='text'
                                value={borrowed}
                                placeholder={bookDetails[0].borrowed.toString()}
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
                                placeholder={bookDetails[0].borrower}
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
                                placeholder={bookDetails[0].borrowed_date}
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
                {bookDetails &&  bookDetails.length > 0 && (
                    <div>
                        <h2>Book Info</h2>

                        <img src={bookDetails[0].cover_url} />

                        <p>Title: {bookDetails[0].title}</p>

                        {(bookDetails[0].subtitle === undefined || bookDetails[0].subtitle === null || bookDetails[0].subtitle === 0) ? (
                            <p>Subtitle: n/a</p>
                        ) : (
                            <p>Subtitle: {bookDetails[0].subtitle}</p>
                        )}

                        <p>Author: {bookDetails[0].author}</p>

                        {(bookDetails[0].publisher === undefined || bookDetails[0].publisher === null || bookDetails[0].publisher === 0) ? (
                            <p>Publisher: n/a</p>
                        ) : (
                            <p>Publisher: {bookDetails[0].publisher}</p>
                        )}

                        {(bookDetails[0].published === undefined || bookDetails[0].published === null || bookDetails[0].published === 0) ? (
                            <p>Published: n/a</p>
                        ) : (
                            <p>Published: {bookDetails[0].published}</p>
                        )}

                        {(bookDetails[0].genre === undefined || bookDetails[0].genre === null || bookDetails[0].genre === 0) ? (
                            <p>Genre: n/a</p>
                        ) : (
                            <p>Genre: {bookDetails[0].genre}</p>
                        )}

                        {(bookDetails[0].pages === undefined || bookDetails[0].pages === null || bookDetails[0].pages === 0) ? (
                            <p>Pages: n/a</p>
                        ) : (
                            <p>Pages: {bookDetails[0].pages}</p>
                        )}

                        <p>ISBN: {bookDetails[0].isbn}</p>

                        {(bookDetails[0].description === undefined || bookDetails[0].description === null || bookDetails[0].description === 0) ? (
                            <p>Description: n/a</p>
                        ) : (
                            <p>Description: {bookDetails[0].description}</p>
                        )}

                        <h2>Your info</h2>

                        {/* yes/no toggle box here */}
                        <p>Read it? {bookDetails[0].read_status}</p>

                        {(bookDetails[0].rating === undefined || bookDetails[0].rating === null || bookDetails[0].rating === 0) ? (
                            <p>Like it?  n/a</p>
                        ) : (
                            <p>Like it? {bookDetails[0].rating}</p>
                        )}

                        {(bookDetails[0].review === undefined || bookDetails[0].review === null || bookDetails[0].review === 0) ? (
                            <p>What'd you think? n/a</p>
                        ) : (
                            <p>What'd you think? {bookDetails[0].review}</p>
                        )}

                        {/* yes/no toggle box here, too
                                and if yes, then render the borrowed data fields below */}
                        <p>Somebody got it currently? {bookDetails[0].borrowed}</p>

                        <p>Who? {bookDetails[0].borrower}</p>
                        <p>Since when? {bookDetails[0].borrowed_date}</p>


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
                )}
                </>
            )}
        </>
    );
}

export default BookDetails;