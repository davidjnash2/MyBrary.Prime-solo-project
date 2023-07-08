import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Paper } from '@mui/material';
import { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function SearchBook({ book }) {

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const history = useHistory();


    // const addBook = () => {

    //     const isbn = (book.volumeInfo.industryIdentifiers[0].type == 'ISBN_13' ?
    //         book.volumeInfo.industryIdentifiers[0].identifier
    //         :
    //         book.volumeInfo.industryIdentifiers[1].identifier);
    //     console.log('this addBook isbn is:', isbn);

    //     dispatch({
    //         type: 'ADD_BOOK',
    //         payload: {
    //             cover_url: book.volumeInfo.imageLinks.thumbnail,
    //             title: book.volumeInfo.title,
    //             subtitle: book.volumeInfo.subtitle,
    //             author: book.volumeInfo.authors,
    //             publisher: book.volumeInfo.publisher,
    //             published: book.volumeInfo.publishedDate,
    //             genre: book.volumeInfo.categories,
    //             pages: book.volumeInfo.pageCount,
    //             description: book.volumeInfo.description,
    //             isbn: isbn,
    //         }
    //     })
    // }

    const addBook = (event) => {
        const isbn = (book.volumeInfo.industryIdentifiers[0].type == 'ISBN_13' ?
            book.volumeInfo.industryIdentifiers[0].identifier
            :
            book.volumeInfo.industryIdentifiers[1].identifier);
        console.log('this addBook isbn is:', isbn);
        event.preventDefault();
        dispatch({
            type: 'ADD_BOOK',
            payload: {
                cover_url: book.volumeInfo.imageLinks.thumbnail,
                title: book.volumeInfo.title,
                subtitle: book.volumeInfo.subtitle,
                author: book.volumeInfo.authors,
                publisher: book.volumeInfo.publisher,
                published: book.volumeInfo.publishedDate,
                genre: book.volumeInfo.categories,
                pages: book.volumeInfo.pageCount,
                description: book.volumeInfo.description,
                isbn: isbn,
            }
        });
        MySwal.fire({
            title: `${book.volumeInfo.title} has been added to your MyBrary!`,
            text: "Search again or see your books?",
            icon: "success",
            showCloseButton: true,
            showDenyButton: true,
            confirmButtonText: 'Search',
            denyButtonText: `MyBrary`,
            confirmButtonColor: "#2E9CCA",
            denyButtonColor: "#390854",
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/search');
            } else if (result.isDenied) {
                history.push('/library');
            }
        })

    };



    // using conditional rendering, optional chaining, and &&/AND operators to ensure that only results which contain
    // the information I want for POST is accessible and available as choice options for user

    // results from original build have been more restricted than is optimally functional, so commenting
    // out some of the key restrictions for rendering, to see if better search results present for user
    // without breaking everything else
    return (
        <>
            {book && (
                (book?.volumeInfo?.industryIdentifiers?.[0]?.type === 'ISBN_13' ||
                    (book?.volumeInfo?.industryIdentifiers?.[1] && book?.volumeInfo?.industryIdentifiers?.[1]?.type === 'ISBN_13')) &&
                book?.volumeInfo?.imageLinks !== undefined &&
                book?.volumeInfo?.title !== undefined &&
                book?.volumeInfo?.authors !== undefined && (
                    <Card
                        onClick={addBook}
                        sx={{
                            minWidth: 200,
                            maxWidth: 300,
                            maxHeight: 375,
                            minHeight: 375,
                        }}
                        elevation={3}
                    >
                        <CardActionArea>
                            <Paper
                                sx={{
                                    display: "flex",
                                    alignItems: 'center',
                                    height: '100%',
                                    width: "100%",
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                <CardContent
                                    sx={{
                                        height: 350,
                                        width: '95%',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',

                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={book?.volumeInfo?.imageLinks?.thumbnail}
                                        alt={book?.volumeInfo?.title}
                                        sx={{
                                            objectFit: "contain",
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                        }}
                                    />
                                </CardContent>
                            </Paper>
                        </CardActionArea>
                    </Card>
                ))}
        </>
    )
}

export default SearchBook;