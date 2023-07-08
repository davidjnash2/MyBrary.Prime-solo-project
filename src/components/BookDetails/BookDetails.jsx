import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './BookDetails.css';
import { Grid, Button, Typography, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function BookDetails({ }) {

    const bookDetails = useSelector(store => store.details);

    console.log('in BookDetails, and bookDetails is:', bookDetails);

    const dispatch = useDispatch();
    const history = useHistory();
    const MySwal = withReactContent(Swal)
    const bookId = useParams();
    console.log('bookId is:', bookId);

    const thumbnailUrl = bookDetails && bookDetails.length > 0 ? bookDetails[0].cover_url : '';
    const largeUrl = thumbnailUrl ? thumbnailUrl.replace("zoom=1", "zoom=0") : '';


    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: bookId.id
        });
    }, []);


    // const deleteUserBook = (event) => {
    //     event.preventDefault();
    //     console.log('in deleteUserBook, and id to delete is:', bookDetails[0].book_id);
    //     dispatch({
    //         type: 'DELETE_USER_BOOK',
    //         payload: bookDetails[0].book_id
    //     });
    //     history.push('/library');
    // }


    const deleteUserBook = (event) => {
        event.preventDefault();
        MySwal.fire({
            title: "Please confirm you want to delete this book from your MyBrary.",
            text: "Click confirm to complete deletion.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire("Book deleted!", {
                    icon: "success",
                    timer: 1500,
                    buttons: false,
                });
                dispatch({
                    type: 'DELETE_USER_BOOK',
                    payload: bookDetails[0].book_id
                });
                history.push('/library');
            } else {
                MySwal.fire("Delete canceled!", {
                    icon: "info",
                    timer: 1500,
                    buttons: false,
                })
            }
        })
    };

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

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate an asynchronous API call to fetch book details
        setTimeout(() => {
            // Set isLoading to false once the data is fetched
            setIsLoading(false);
        }, 25);
    }, []); // Empty dependency array to run the effect only once

    // ...

    if (isLoading) {
        // Render a loading state or a placeholder component
        return <div>Loading...</div>;
    }


    const borrowedDate = bookDetails[0].borrowed_date;
    const formattedDate = new Date(borrowedDate).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });


    return (
        <>
            {bookDetails && bookDetails.length > 0 && (
                <Container maxWidth="lg">
                    <Grid container spacing={1}
                        sx={{
                            m: 0,
                        }}>
                        <Grid item xs={12}>
                            <Typography sx={{
                                mt: 10,
                                fontFamily: "Rockwell Extra Bold, Rockwell Bold, monospace",
                            }}
                                variant="h1">{bookDetails[0].title}</Typography>
                            <h3>{bookDetails[0].subtitle}</h3>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <img
                                    className="details-cover-image"
                                    src={largeUrl}
                                    alt={bookDetails[0].title} />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <h2>Book Stuff</h2>
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

                                {/* {bookDetails[0].read_status ? (
                                    <>
                                        {(bookDetails[0].rating === undefined || bookDetails[0].rating === null || bookDetails[0].rating === 0) ? (
                                            <p>Like it?  n/a</p>
                                        ) : (
                                            <p>Like it? {bookDetails[0].rating}</p>
                                        )}
                                    </>
                                ) : (
                                    null
                                )} */}

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

                                {bookDetails[0].borrowed ? (
                                    <>
                                        <p>Who? {bookDetails[0].borrower}</p>
                                        <p>Since when? {formattedDate}</p>
                                    </>
                                ) : (
                                    null
                                )}
                                <Stack direction="column" spacing={2}>
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        name="edit"
                                        onClick={() => history.push(`/edit/${bookId.id}`)}
                                    >
                                        EDIT STUFF
                                    </Button>
                                    <Button
                                        variant="contained"
                                        // startIcon={<DeleteIcon />}
                                        name="delete"
                                        sx={{
                                            p: 1,
                                        }}
                                        onClick={deleteUserBook}
                                    >
                                        <DeleteIcon /> DELETE BOOK
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<LibraryBooksIcon />}
                                        name="back_to_library"
                                        onClick={() => history.push('/library')}
                                    >
                                        BACK TO LIBRARY
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </>
    );
}


export default BookDetails;