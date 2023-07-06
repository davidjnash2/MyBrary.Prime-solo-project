import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LibraryBook.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Paper } from '@mui/material';
import {useEffect, useRef } from 'react';





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
                    maxWidth: 300,
                    maxHeight: "100%",
                    objectFit: "contain",
                    maxHeight: 350,
                    minHeight: 350,
                }}
                elevation={16}
            >
                <Paper sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="350"
                            // image={largeUrl}
                            // image={thumbnailUrl}
                            image={userBook.cover_url}
                            objectFit= "contain"
                            alt="book cover"
                            sx={{
                                objectFit: "contain",
                                width: "100%",
                            }}
                        />
                        {/* <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {userBook.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {userBook.author}
                            </Typography>
                        </CardContent> */}
                    </CardActionArea>
                </Paper>
            </Card>
        </>
    )
}


export default LibraryBook;

