import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LibraryBook.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Paper } from '@mui/material';
import { useEffect, useRef } from 'react';


function LibraryBook({ userBook }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const thumbnailUrl = userBook.cover_url;
    const largeUrl = thumbnailUrl ? thumbnailUrl.replace("zoom=1", "zoom=0") : userBook.cover_url;
    console.log('largeUrl is:', largeUrl);

    // user click on book will bring to details page for that book
    const clickCover = () => {
        console.log('clicked userBook.book_id is', userBook.book_id);
        history.push(`/details/${userBook.book_id}`)
        dispatch({
            type: 'FETCH_DETAILS',
            payload: userBook.book_id
        })
    }

    return (
        <>
            <Card
                onClick={clickCover}
                sx={{
                    minWidth: 200,
                    maxWidth: 300,
                    maxHeight: 375,
                    minHeight: 375,
                }}
                elevation={16}
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
                                // height: '85%',
                                width: '95%',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                
                            }}
                        >
                            <CardMedia
                                component="img"
                                minHeight={350}
                                maxHeight={350}
                                image={largeUrl}
                                // image={thumbnailUrl}
                                // image={userBook.cover_url}
                                objectfit="contain"
                                alt={userBook.title}
                                sx={{
                                    objectFit: "contain",
                                    width: "100%",
                                }}
                            />
                        </CardContent>
                    </Paper>
                </CardActionArea>
            </Card>
        </>
    )
}


export default LibraryBook;

