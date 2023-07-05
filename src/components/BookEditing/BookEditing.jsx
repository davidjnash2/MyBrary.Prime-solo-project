import react from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import './BookDetails.css';
import { Grid, Button } from '@mui/material';

function BookEditing({ }) {

    const bookDetails = useSelector(store => store.details);

    console.log('in BookDetails, and bookDetails is:', bookDetails);

    const dispatch = useDispatch();
    const history = useHistory();

    const bookId = useParams();
    console.log('bookId is:', bookId);

    const [editing, setEditing] = useState(false);

    const [subtitle, setSubtitle] = useState(bookDetails[0]?.subtitle || '');
    const [publisher, setPublisher] = useState(bookDetails[0]?.publisher || '');
    const [published, setPublished] = useState(bookDetails[0]?.published || '');
    const [genre, setGenre] = useState(bookDetails[0]?.genre || '');
    const [pages, setPages] = useState(bookDetails[0]?.pages || '');
    const [description, setDescription] = useState(bookDetails[0]?.description || '');
    const [read, setRead] = useState(bookDetails[0]?.read_status || '');
    const [rating, setRating] = useState(bookDetails[0]?.rating || '');
    const [review, setReview] = useState(bookDetails[0]?.review || '');
    const [borrowed, setBorrowed] = useState(bookDetails[0]?.borrowed || '');
    const [borrower, setBorrower] = useState(bookDetails[0]?.borrower || '');
    const [borrowedDate, setBorrowedDate] = useState(bookDetails[0]?.borrowed_date || '');


    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: bookId.id
        });
    }, []);


    const switchEditing = () => {
        setEditing(!editing);
        dispatch({
            type: 'FETCH_DETAILS',
            payload: bookId.id
        });
    }

    // const deleteUserBook = (event) => {
    //     event.preventDefault();
    //     console.log('in deleteUserBook, and id to delete is:', bookDetails[0].book_id);
    //     dispatch({
    //         type: 'DELETE_USER_BOOK',
    //         payload: bookDetails[0].book_id
    //     });
    //     history.push('/library');
    // }


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
            },
        });
        switchEditing();
        dispatch({
            type: 'FETCH_DETAILS',
            payload: bookDetails[0].book_id
        })
    };



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
        return <div>{options}</div>;
    }

    const cancelEditing = () => {
        switchEditing();
        dispatch({
            type: 'FETCH_DETAILS',
            payload: bookDetails[0].book_id
        });
        setSubtitle(bookDetails[0]?.subtitle || '');
        setPublisher(bookDetails[0]?.publisher || '');
        setPublished(bookDetails[0]?.published || '');
        setGenre(bookDetails[0]?.genre || '');
        setPages(bookDetails[0]?.pages || '');
        setDescription(bookDetails[0]?.description || '');
        setRead(bookDetails[0]?.read_status || '');
        setRating(bookDetails[0]?.rating || '');
        setReview(bookDetails[0]?.review || '');
        setBorrowed(bookDetails[0]?.borrowed || '');
        setBorrower(bookDetails[0]?.borrower || '');
        setBorrowedDate(bookDetails[0]?.borrowed_date || '');

    }

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
                            <Grid container spacing={1}>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <img src={bookDetails[0].cover_url} alt={bookDetails[0].title} />
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <form
                                        onSubmit={updateUserBook}
                                    >
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
                                        // placeholder={bookDetails[0].publisher}
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
                                    </form>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
                                <h2>Your info</h2>
                                <form onSubmit={updateUserBook}>
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
                                        placeholder={bookDetails[0].read_status}
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
                                        placeholder={bookDetails[0].borrowed}
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
                                        placeholder={bookDetails[0].borrowed_date}
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
                                <button
                                    type="cancel"
                                    onClick={cancelEditing}
                                >
                                    Cancel
                                </button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    )
}
export default BookEditing;