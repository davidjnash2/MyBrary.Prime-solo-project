import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LibraryBook.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Paper } from '@mui/material';


function LibraryBook({ userBook }) {

    const history = useHistory();
    const dispatch = useDispatch();

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
            {/* <div onClick={clickCover}>
                <img src={userBook.cover_url} />
                <p>Title: {userBook.title}</p>
                <p>Author: {userBook.author}</p>
            </div> */}
            <Card 
            sx={{ maxWidth: 345,
                objectFit: "contain",
            }}
            elevation={16}>
                <Paper>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={userBook.cover_url}
                            alt="book cover"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {userBook.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {userBook.author}
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                </Paper>
            </Card>
        </>
    )
}


export default LibraryBook;


// export default function ActionAreaCard() {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image="/static/images/cards/contemplative-reptile.jpg"
//           alt="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Lizards are a widespread group of squamate reptiles, with over 6,000
//             species, ranging across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }
