import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import LibraryBook from '../LibraryBook/LibraryBook';

function LibraryList() {

    const dispatch = useDispatch();

    const library = useSelector(store => store.library);

    useEffect(() => {
        dispatch({
            type: 'FETCH_LIBRARY'
        })
    }, []);


    // map over library array, making sure there are actually
    //  values present before mapping so as not to crash DOM
    return (
        <>
            {library && library.map((userBook, i) => (
                <div key={i}>
                    <LibraryBook userBook={userBook} />
                </div>
            ))}
        </>
    )
}

export default LibraryList;