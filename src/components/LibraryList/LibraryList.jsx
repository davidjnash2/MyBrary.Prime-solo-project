import React, { useState, useEffect } from 'react';
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

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate an asynchronous API call to fetch book details
        setTimeout(() => {
            // Set isLoading to false once the data is fetched
            setIsLoading(false);
        }, 100);
    }, []); // Empty dependency array to run the effect only once

    // ...

    if (isLoading) {
        // Render a loading state or a placeholder component
        return <div>Loading...</div>;
    }

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