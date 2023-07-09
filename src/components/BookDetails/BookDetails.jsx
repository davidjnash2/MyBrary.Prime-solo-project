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
    const MySwal = withReactContent(Swal);
    const bookId = useParams();
    // console.log('bookId is:', bookId);

    const thumbnailUrl = bookDetails && bookDetails.length > 0 ? bookDetails[0].cover_url : '';
    const largeUrl = thumbnailUrl ? thumbnailUrl.replace("zoom=1", "zoom=0") : '';


    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: bookId.id
        });
    }, []);


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
                    timer: 1000,
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

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate an asynchronous API call to fetch book details
        setTimeout(() => {
            // Set isLoading to false once the data is fetched
            setIsLoading(false);
        }, 25);
    }, []); // Empty dependency array to run the effect only once

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
                <Container maxWidth="xl">
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
                        <Grid item xs={12} sm={5} md={5} lg={5} xl={5}
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
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                            <Typography
                                variant="h2"
                                sx={{
                                    marginBottom: 0,
                                    textAlign: "left",
                                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                    fontSize: "1.75rem",
                                }}>You stuff</Typography>

                            {/* {(bookDetails[0].read_status === false || bookDetails[0].read_status === undefined || bookDetails[0].read_status === null || bookDetails[0].read_status === 0) ? ( */}
                            {bookDetails[0].read_status ? (
                                <>
                                    <p>Read it? Yup!</p>
                                    {(bookDetails[0].rating === undefined || bookDetails[0].rating === null) ? (
                                        null
                                    ) : (
                                        <p>Was it good? {bookDetails[0].rating}</p>
                                    )}
                                    {(bookDetails[0].review === undefined || bookDetails[0].review === null || bookDetails[0].review === 0) ? (
                                        null
                                    ) : (
                                        <p>What'd you think? {bookDetails[0].review}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p>Read it? Nope.</p>
                                </>


                            )}




                            {bookDetails[0].borrowed ? (
                                <>
                                    <p>Somebody got it currently? Yup.</p>
                                    <p>{bookDetails[0].borrower} has it.</p>
                                    <p>...and has since {formattedDate}.</p>
                                </>
                            ) : (
                                <>
                                    <p>Somebody got it currently? Nope.</p>
                                </>
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
                </Container >
            )
            }
        </>
    );
}


export default BookDetails;