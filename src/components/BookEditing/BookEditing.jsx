import react from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

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

    const thumbnailUrl = bookDetails[0].cover_url;
    const largeUrl = thumbnailUrl ? thumbnailUrl.replace("zoom=1", "zoom=0") : bookDetails[0].cover_url;
    console.log('largeUrl is:', largeUrl);


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
        history.push('/library');
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

    const cancelEditing = (event) => {
        event.preventDefault();
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
        history.push(`/details/${bookId.id}`);
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
                    <Grid container spacing={1} id="book-container">
                        <Grid item xs={12} id="title-section">
                            <h1>{bookDetails[0].title}</h1>
                        </Grid>
                        <Grid container item xs={12} id="info-section">
                            <Grid item id="book-cover" className="book-details" xs={4} sm={4} md={4} lg={4} xl={4}>
                                <img src={largeUrl} alt={bookDetails[0].title} />
                            </Grid>
                            <Grid item id="book-info" className="book-details" xs={4} sm={4} md={4} lg={4} xl={4}>
                                <form
                                    onSubmit={updateUserBook}
                                >
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <h2>Book Stuff</h2>
                                            <label htmlFor="subtitle">Subtitle:</label>
                                            <input
                                                onChange={(event) => setSubtitle(event.target.value)}
                                                type='text'
                                                value={subtitle}
                                                placeholder={bookDetails[0].subtitle}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <p>Author: {bookDetails[0].author}</p>
                                        </Grid>
                                        <Grid item>
                                            <label htmlFor="publisher">Publisher:</label>
                                            <input
                                                onChange={(event) => setPublisher(event.target.value)}
                                                type='text'
                                                value={publisher}
                                            // placeholder={bookDetails[0].publisher}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <label htmlFor="published">Published:</label>
                                            <select onChange={(event) => setPublished(event.target.value)} value={published}>
                                                {renderYearOptions()}
                                            </select>
                                        </Grid>

                                        <Grid item>
                                            <label htmlFor="genre">Genre:</label>
                                            <input
                                                onChange={(event) => setGenre(event.target.value)}
                                                type='text'
                                                value={genre}
                                                placeholder={bookDetails[0].genre}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <label htmlFor="pages">Pages:</label>
                                            <input
                                                onChange={(event) => setPages(event.target.value)}
                                                type='number'
                                                value={pages}
                                                placeholder={bookDetails[0].pages}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <p>ISBN: {bookDetails[0].isbn}</p>
                                        </Grid>
                                        <Grid item>
                                            <label htmlFor="description">Description:</label>
                                            <input
                                                onChange={(event) => setDescription(event.target.value)}
                                                type='text'
                                                value={description}
                                                placeholder={bookDetails[0].description}
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item id="you-stuff" className="book-details" xs={4} sm={4} md={4} lg={4} xl={4}>
                                <h2>You stuff</h2>
                                <form onSubmit={updateUserBook}>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
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
                                        </Grid>
                                        <Grid item>
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
                                        </Grid>
                                        <Grid item>
                                            <label htmlFor="review">Review:</label>
                                            <input
                                                onChange={(event) => setReview(event.target.value)}
                                                type='text'
                                                value={review}
                                                placholder={bookDetails[0].review}
                                            />

                                        </Grid>
                                        {/* yes/no toggle box here, too
                                and if yes, then render the borrowed data fields below */}

                                        <Grid item></Grid>
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
                                    </Grid>

                                    <Grid item>
                                        <label htmlFor="borrower">Borrower:</label>
                                        <input
                                            onChange={(event) => setBorrower(event.target.value)}
                                            type='text'
                                            value={borrower}
                                            placeholder={bookDetails[0].borrower}
                                        />
                                    </Grid>
                                    <Grid item>
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
                                    </Grid>
                                    
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                variant="contained"
                                                startIcon={<SaveIcon />}
                                                name="save"
                                                type="submit"
                                            >
                                                SAVE CHANGES
                                            </Button>
                                    
                                        <Button
                                            variant="contained"
                                            startIcon={<CancelIcon />}
                                            name="cancel"
                                            type="cancel"
                                            onClick={cancelEditing}
                                        >
                                            CANCEL
                                        </Button>
                                        </Stack>
                                   
                                </form>
                            </Grid>
                        </Grid>
                    </Grid >
                </div >
            )
            }
        </>
    )
}
export default BookEditing;