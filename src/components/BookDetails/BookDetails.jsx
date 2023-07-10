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
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

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

    const publishedDate = bookDetails[0].published;
    const formattedPublishedDate = new Date(publishedDate).toLocaleDateString('en-US', {
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

                            <Typography
                                variant="p"
                                sx={{
                                    marginBottom: 0,
                                    marginTop: 2,
                                    textAlign: "left",
                                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                    fontSize: "1rem",
                                    color: "white",
                                }}
                            >
                                Author: {bookDetails[0].author}
                            </Typography>

                            {(bookDetails[0].publisher === undefined || bookDetails[0].publisher === null || bookDetails[0].publisher === 0) ? (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Publisher: n/a
                                </Typography>
                            ) : (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Publisher: {bookDetails[0].publisher}
                                </Typography>
                            )}

                            {(bookDetails[0].published === undefined || bookDetails[0].published === null || bookDetails[0].published === 0) ? (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Published: n/a
                                </Typography>
                            ) : (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Published: {formattedPublishedDate}
                                </Typography>
                            )}

                            {(bookDetails[0].genre === undefined || bookDetails[0].genre === null || bookDetails[0].genre === 0) ? (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Genre: n/a
                                </Typography>
                            ) : (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Genre: {bookDetails[0].genre}
                                </Typography>
                            )}

                            {(bookDetails[0].pages === undefined || bookDetails[0].pages === null || bookDetails[0].pages === 0) ? (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Pages: n/a
                                </Typography>
                            ) : (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Pages: {bookDetails[0].pages}
                                </Typography>
                            )}

                            <Typography
                                variant="p"
                                sx={{
                                    marginBottom: 0,
                                    marginTop: 2,
                                    textAlign: "left",
                                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                    fontSize: "1rem",
                                    color: "white",
                                }}
                            >
                                ISBN-13: {bookDetails[0].isbn}
                            </Typography>


                            {(bookDetails[0].description === undefined || bookDetails[0].description === null || bookDetails[0].description === 0) ? (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Description: n/a
                                </Typography>
                            ) : (
                                <Typography
                                    variant="p"
                                    sx={{
                                        marginBottom: 0,
                                        marginTop: 2,
                                        textAlign: "left",
                                        fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                        fontSize: "1rem",
                                        color: "white",
                                    }}
                                >
                                    Description: {bookDetails[0].description}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} spacing={2}>
                            <Typography
                                variant="h2"
                                sx={{
                                    marginBottom: 2,
                                    textAlign: "left",
                                    fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                    fontSize: "1.75rem",
                                }}>You stuff</Typography>

                            {bookDetails[0].read_status ? (
                                <>
                                    <Typography
                                        variant="p"
                                        sx={{
                                            marginBottom: 0,
                                            marginTop: 2,
                                            textAlign: "left",
                                            fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                            fontSize: "1rem",
                                            color: "white",
                                        }}
                                    >Read it? Yup!
                                    </Typography>
                                    <Box
                                        sx={{
                                            '& > legend': { mt: 2, mb: 3, },
                                        }}
                                    >
                                        <Typography
                                            component="legend"
                                            variant="p"
                                            sx={{
                                                marginBottom: 0,
                                                marginTop: 3,
                                                textAlign: "left",
                                                fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                                fontSize: "1rem",
                                                color: "white",
                                            }}>
                                            Rating:
                                        </Typography>
                                        <Rating
                                            name="rating-read-only"
                                            value={bookDetails[0].rating}
                                            readOnly
                                        />
                                    </Box>

                                    <Typography
                                        component="legend"
                                        variant="p"
                                        sx={{
                                            marginBottom: 0,
                                            marginTop: 2,
                                            textAlign: "left",
                                            fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                            fontSize: "1rem",
                                            color: "white",
                                        }}>
                                        Review:
                                    </Typography>
                                    <Typography
                                        component="legend"
                                        variant="p"
                                        sx={{
                                            marginBottom: 5,
                                            textAlign: "left",
                                            fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                            fontSize: "1rem",
                                            color: "white",
                                        }}>
                                        {bookDetails[0].review}
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="p"
                                        sx={{
                                            marginBottom: 2,
                                            marginTop: 2,
                                            textAlign: "left",
                                            fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                            fontSize: "1rem",
                                            color: "white",
                                        }}
                                    >Read it? Nope.
                                    </Typography>
                                </>


                            )}

                            <br />
                            <br />

                            {bookDetails[0].borrowed ? (
                                <>
                                    <Typography
                                        variant="p"
                                        sx={{
                                            marginBottom: 2,
                                            marginTop: 2,
                                            textAlign: "left",
                                            fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                            fontSize: "1rem",
                                            color: "white",
                                        }}
                                    >
                                        Somebody got it currently? Yup. {bookDetails[0].borrower} has it.
                                    </Typography>
                                    <br />
                                    <br/>
                                    <Typography
                                        variant="p"
                                        sx={{
                                            marginBottom: 0,
                                            marginTop: 2,
                                            textAlign: "left",
                                            fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                            fontSize: "1rem",
                                            color: "white",
                                        }}
                                    >
                                        ...and has since {formattedDate}.
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="p"
                                        sx={{
                                            marginBottom: 3,
                                            marginTop: 2,
                                            textAlign: "left",
                                            fontFamily: "Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif",
                                            fontSize: "1rem",
                                            color: "white",
                                        }}
                                    >Somebody got it currently? Nope.</Typography>
                                </>
                            )}
                            <Stack
                                direction="column"
                                spacing={3}
                                marginTop={3}
                            >
                                <Button
                                    variant="contained"
                                    marginTop={3}
                                    startIcon={<EditIcon />}
                                    name="edit"
                                    onClick={() => history.push(`/edit/${bookId.id}`)}
                                >
                                    EDIT STUFF
                                </Button>
                                <Button
                                    variant="contained"
                                    name="delete"
                                    startIcon={<DeleteIcon />}
                                    sx={{
                                        p: 1,
                                    }}
                                    onClick={deleteUserBook}
                                >
                                    DELETE BOOK
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
            )}
        </>
    );
}


export default BookDetails;