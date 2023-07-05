import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './BookDetails.css';
import { Grid, Button } from '@mui/material';



function BookDetails({ }) {

    const bookDetails = useSelector(store => store.details);

    console.log('in BookDetails, and bookDetails is:', bookDetails);

    const dispatch = useDispatch();
    const history = useHistory();

    const bookId = useParams();
    console.log('bookId is:', bookId);

    // const [editing, setEditing] = useState(false);

    // const [subtitle, setSubtitle] = useState(bookDetails[0]?.subtitle || '');
    // const [publisher, setPublisher] = useState(bookDetails[0]?.publisher || '');
    // const [published, setPublished] = useState(bookDetails[0]?.published || '');
    // const [genre, setGenre] = useState(bookDetails[0]?.genre || '');
    // const [pages, setPages] = useState(bookDetails[0]?.pages || '');
    // const [description, setDescription] = useState(bookDetails[0]?.description || '');
    // const [read, setRead] = useState(bookDetails[0]?.read_status || '');
    // const [rating, setRating] = useState(bookDetails[0]?.rating || '');
    // const [review, setReview] = useState(bookDetails[0]?.review || '');
    // const [borrowed, setBorrowed] = useState(bookDetails[0]?.borrowed || '');
    // const [borrower, setBorrower] = useState(bookDetails[0]?.borrower || '');
    // const [borrowedDate, setBorrowedDate] = useState(bookDetails[0]?.borrowed_date || '');


    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: bookId.id
        });
    }, []);


    // const switchEditing = () => {
    //     // setEditing(!editing);
    //     dispatch({
    //         type: 'FETCH_DETAILS',
    //         payload: bookId.id
    //     });
    //     history.push(`/edit/${bookId.id}`)
    // }

    const deleteUserBook = (event) => {
        event.preventDefault();
        console.log('in deleteUserBook, and id to delete is:', bookDetails[0].book_id);
        dispatch({
            type: 'DELETE_USER_BOOK',
            payload: bookDetails[0].book_id
        });
        history.push('/library');
    }


    // const updateUserBook = (event) => {
    //     event.preventDefault();
    //     console.log('in updateUserBook');
    //     dispatch({
    //         type: 'UPDATE_USER_BOOK',
    //         payload: {
    //             id: bookDetails[0].book_id,
    //             subtitle,
    //             publisher,
    //             published,
    //             genre,
    //             pages,
    //             description,
    //             read,
    //             rating,
    //             review,
    //             borrowed,
    //             borrowedDate,
    //             borrower,
    //         },
    //     });
    //     switchEditing();
    //     dispatch({
    //         type: 'FETCH_DETAILS',
    //         payload: bookDetails[0].book_id
    //     })
    // };



    // function renderYearOptions() {
    //     const currentYear = new Date().getFullYear();
    //     const startYear = currentYear;
    //     const endYear = currentYear - 999;

    //     const options = [];
    //     for (let year = startYear; year >= endYear; year--) {
    //         options.push(
    //             <option key={year} value={year}>
    //                 {year}
    //             </option>
    //         );
    //     }
    //     return options;
    // }

    // const cancelEditing = () => {
    //     switchEditing();
    //     dispatch({
    //         type: 'FETCH_DETAILS',
    //         payload: bookDetails[0].book_id
    //     });
    //     setSubtitle(bookDetails[0]?.subtitle || '');
    //     setPublisher(bookDetails[0]?.publisher || '');
    //     setPublished(bookDetails[0]?.published || '');
    //     setGenre(bookDetails[0]?.genre || '');
    //     setPages(bookDetails[0]?.pages || '');
    //     setDescription(bookDetails[0]?.description || '');
    //     setRead(bookDetails[0]?.read_status || '');
    //     setRating(bookDetails[0]?.rating || '');
    //     setReview(bookDetails[0]?.review || '');
    //     setBorrowed(bookDetails[0]?.borrowed || '');
    //     setBorrower(bookDetails[0]?.borrower || '');
    //     setBorrowedDate(bookDetails[0]?.borrowed_date || '');

    // }

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate an asynchronous API call to fetch book details
        setTimeout(() => {
            // Set isLoading to false once the data is fetched
            setIsLoading(false);
        }, 10);
    }, []); // Empty dependency array to run the effect only once

    // ...

    if (isLoading) {
        // Render a loading state or a placeholder component
        return <div>Loading...</div>;
    }


    return (
        <>
            {bookDetails && bookDetails.length > 0 && (
                <div className="details-container">
                    <Grid container spacing={1}>
                        <Grid item xs={12}
                        >
                            <h1>{bookDetails[0].title}</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <img src={bookDetails[0].cover_url} alt={bookDetails[0].title} />
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <h2>Book Stuff</h2>
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

                                    <p>ISBN-13: {bookDetails[0].isbn}</p>

                                
                                    {(bookDetails[0].description === undefined || bookDetails[0].description === null || bookDetails[0].description === 0) ? (
                                        <p>Description: n/a</p>
                                    ) : (
                                        <p>Description: {bookDetails[0].description}</p>
                                    )}
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <h2>You stuff</h2>

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

                                    <Button
                                        type="button"
                                        onClick={() => history.push(`/edit/${bookId.id}`)}
                                    >
                                        EDIT STUFF
                                    </Button>
                                    <Button
                                        name="delete"
                                        onClick={deleteUserBook}
                                    >
                                        DELETE BOOK
                                    </Button>
                                    <Button
                                        name="back_to_library"
                                        onClick={() => history.push('/library')}
                                    >
                                        BACK TO LIBRARY
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    );
}


export default BookDetails;