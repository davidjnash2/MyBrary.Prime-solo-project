import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Container, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import './BookEditing.css';

function BookEditing({ }) {

    const bookDetails = useSelector(store => store.details);

    console.log('in BookDetails, and bookDetails is:', bookDetails);

    const dispatch = useDispatch();
    const history = useHistory();

    const MySwal = withReactContent(Swal);

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

    const thumbnailUrl = bookDetails[0]?.cover_url || '';
    const largeUrl = thumbnailUrl ? thumbnailUrl.replace("zoom=1", "zoom=0") : '';
    // console.log('largeUrl is:', largeUrl);

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
        history.push(`/details/${bookId.id}`);
        MySwal.fire({
            title: "Changes saved!",
            icon: "success",
            showButtons: false,
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
        return options;
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

    if (isLoading) {
        // Render a loading state or a placeholder component
        return <div>Loading...</div>;
    }


    return (
        <>
            {bookDetails && bookDetails.length > 0 && (
                <Container maxWidth="xl">
                    <form onSubmit={updateUserBook}>
                        <Grid container spacing={2} sx={{ m: 3 }}>
                            <Grid item xs={12}>
                                <Typography sx={{
                                    mt: 10,
                                    fontFamily: "Rockwell Extra Bold, Rockwell Bold, monospace",
                                    fontSize: "5rem",
                                }}
                                    variant="h1"
                                >
                                    {bookDetails[0].title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{
                                    marginBottom: 5,
                                    textAlign: "center",
                                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif"
                                }}
                                    variant="h3"
                                >
                                    {bookDetails[0].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <img
                                    className="details-cover-image"
                                    src={largeUrl}
                                    alt={bookDetails[0].title} />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        marginBottom: 0,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1.75rem",
                                    }}>
                                    Book Stuff
                                </Typography>
                                <p>Author: {bookDetails[0].author}</p>

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id="publisher-controlled"
                                    label="Publisher"
                                    value={publisher}
                                    onChange={(event) => setPublisher(event.target.value)}
                                />

                                <label htmlFor="published">Published:</label>
                                <select onChange={(event) => setPublished(event.target.value)} value={published}>
                                    {renderYearOptions()}
                                </select>


                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id="genre-controlled"
                                    label="Genre"
                                    value={genre}
                                    onChange={(event) => setGenre(event.target.value)}
                                />

                                <label htmlFor="pages">Pages:</label>
                                <input
                                    sx={{ width: "100%", marginBottom: 2 }}
                                    onChange={(event) => setPages(event.target.value)}
                                    type='number'
                                    value={pages}
                                    placeholder={bookDetails[0].pages}
                                />

                                <p>ISBN: {bookDetails[0].isbn}</p>


                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id="description-controlled"
                                    label="Description"
                                    value={description}
                                    multiline
                                    maxRows={4}
                                    onChange={(event) => setDescription(event.target.value)}
                                />

                            </Grid>
                            <Grid item id="you-stuff" className="book-details" xs={4} sm={3} md={3} lg={3} xl={3}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        marginBottom: 0,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1.75rem",
                                    }}>You stuff</Typography>

                                <InputLabel id="read-status-selector-label">Read it?</InputLabel>
                                <Select
                                    labelId="read-status-selector-label"
                                    id="read-status-selector-helper"
                                    value={read}
                                    input={<OutlinedInput label="Read it?" />}
                                    onChange={(event) => setRead(event.target.value)}
                                >
                                    <MenuItem value={false}>Nope</MenuItem>
                                    <MenuItem value={true}>Yep!</MenuItem>
                                </Select>

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

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id="review-controlled"
                                    label="Review"
                                    value={review}
                                    multiline
                                    maxRows={4}
                                    onChange={(event) => setReview(event.target.value)}
                                />

                                <InputLabel id="borrowed-status-selector-label">Somebody have it?</InputLabel>
                                <Select
                                    labelId="borrowed-status-selector-label"
                                    id="borrowed-status-selector-helper"
                                    value={borrowed}
                                    label="Read it?"
                                    onChange={(event) => setBorrowed(event.target.value)}
                                >
                                    <MenuItem value={false}>Nope</MenuItem>
                                    <MenuItem value={true}>Yep!</MenuItem>
                                </Select>

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id="borrower-controlled"
                                    label="Borrower"
                                    value={borrower}
                                    onChange={(event) => setBorrower(event.target.value)}
                                />

                                <label htmlFor="borrowed_date">Borrowed date:</label>
                                <input
                                    type="date"
                                    id="borrowed_date"
                                    value={borrowedDate}
                                    placeholder={bookDetails[0].borrowed_date}
                                    onChange={(event) => setBorrowedDate(event.target.value)}
                                />


                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        name="save"
                                        type="submit"
                                        onClick={updateUserBook}
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
                            </Grid>
                        </Grid>
                    </form>
                </Container >)
            }
        </>
    )

}

export default BookEditing;