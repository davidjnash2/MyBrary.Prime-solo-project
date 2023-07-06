import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SearchBook({ book }) {

    const dispatch = useDispatch();



    const addBook = () => {

        const isbn = (book.volumeInfo.industryIdentifiers[0].type == 'ISBN_13' ?
            book.volumeInfo.industryIdentifiers[0].identifier
            :
            book.volumeInfo.industryIdentifiers[1].identifier);
        console.log('this addBook isbn is:', isbn);

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
        })
    }


    // const thumbnailUrl = book?.volumeInfo?.imageLinks?.thumbnail;
    // const largeUrl = thumbnailUrl ? thumbnailUrl.replace("zoom=1", "zoom=0") : book?.volumeInfo?.imageLinks?.thumbnail;
    // console.log('largeUrl is:', largeUrl);

    // using conditional rendering, optional chaining, and &&/AND operators to ensure that only results which contain
    // the information I want for POST is accessible and available as choice options for user

    // results from original build have been more restricted than is optimally functional, so commenting
    // out some of the key restrictions for rendering, to see if better search results present for user
    // without breaking everything else
    return (
        <>
            {book &&
                (book?.volumeInfo?.industryIdentifiers?.[0]?.type === 'ISBN_13' ||
                    (book?.volumeInfo?.industryIdentifiers?.[1] && book?.volumeInfo?.industryIdentifiers?.[1]?.type === 'ISBN_13')) &&
                book?.volumeInfo?.imageLinks &&
                book?.volumeInfo?.title !== undefined &&
                // book?.volumeInfo?.subtitle !== undefined &&
                book?.volumeInfo?.authors !== undefined &&
                // book?.volumeInfo?.publisher !== undefined &&
                // book?.volumeInfo?.publishedDate !== undefined &&
                // book?.volumeInfo?.categories !== undefined &&
                // book?.volumeInfo?.pageCount !== undefined &&
                // book?.volumeInfo?.description !== undefined && 
                (
                    <div>
                        <img
                            src={book?.volumeInfo?.imageLinks?.thumbnail}
                            // src={largeUrl}
                            onClick={addBook}>
                        </img>
                        {book?.volumeInfo?.title && book?.volumeInfo?.title !== 0 && book?.volumeInfo?.title !== undefined && <p>Title: {book.volumeInfo.title}</p>}
                        {book?.volumeInfo?.subtitle && book?.volumeInfo?.subtitle !== 0 && book?.volumeInfo?.subtitle !== undefined && <p>Subtitle: {book.volumeInfo.subtitle}</p>}
                        {book?.volumeInfo?.authors && book?.volumeInfo?.authors !== 0 && book?.volumeInfo?.authors !== undefined && <p>Author: {book.volumeInfo.authors}</p>}
                        {/* {book?.volumeInfo?.publisher && book?.volumeInfo?.publisher !== 0 && book?.volumeInfo?.publisher !== undefined && <p>Publisher: {book.volumeInfo.publisher}</p>} */}
                        {book?.volumeInfo?.publishedDate && book?.volumeInfo?.publishedDate !== 0 && book?.volumeInfo?.publishedDate !== undefined && <p>Published: {book.volumeInfo.publishedDate}</p>}
                        {/* {book?.volumeInfo?.categories && book?.volumeInfo?.categories !== 0 && book?.volumeInfo?.categories !== undefined && <p>Genre: {book.volumeInfo.categories}</p>}
                        {book?.volumeInfo?.pageCount && book?.volumeInfo?.pageCount !== 0 && book?.volumeInfo?.pageCount !== undefined && <p>Pages: {book.volumeInfo.pageCount}</p>} */}
                        {/* {book?.volumeInfo?.industryIdentifiers[0]?.type === 'ISBN_13' ?
                            <p>ISBN: {book.volumeInfo.industryIdentifiers[0]?.identifier}</p>
                            :
                            <p>ISBN: {book.volumeInfo.industryIdentifiers[1]?.identifier}</p>
                        }
                        {book?.volumeInfo?.description && book?.volumeInfo?.description !== 0 && book?.volumeInfo?.description !== undefined && <p>Description: {book.volumeInfo.description}</p>} */}
                    </div>
                )}
        </>
    )
}

export default SearchBook;