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


    // api search returned only thumbnail images, which were fine for smaller results and library views,
    // but proved too low-res for details page, these next three lines are/were a workaround to direct to another
    // image path not returned via api call, but that sometimes directed to a higher-quality image; only worked 
    // some of the time, though, so commented out and just went with lower-res images for presentation to avoid 
    // image failure
    // keeping the commented-out code here for future refenence/use

    // const thumbnailUrl = userBook.cover_url;
    // const largeUrl = thumbnailUrl ? thumbnailUrl.replace("zoom=1", "zoom=0") : userBook.cover_url;
    // console.log('largeUrl is:', largeUrl);


    // user click on book will bring to details page for that book
    // started adding conditional statement for clicks on the OnLoan 
    // view, so that book can be returned to library more easily
    const clickCover = () => {
        // if (onClickCover) {
        //     onClickCover();
        // } else {
        // console.log('clicked userBook.book_id is', userBook.book_id);
        history.push(`/details/${userBook.book_id}`);
        dispatch({
            type: 'FETCH_DETAILS',
            payload: userBook.book_id
        });
        // }
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
                                // image={largeUrl}
                                src={userBook.cover_url}
                                alt={userBook.title}
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
        </>
    )
}


export default LibraryBook;

