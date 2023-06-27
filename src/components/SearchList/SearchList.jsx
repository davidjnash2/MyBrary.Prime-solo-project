import React from 'react';
import { useSelector } from "react-redux";
import SearchBook from '../SearchBook/SearchBook';

function SearchList() {

    // access search results from global state via store
    const results = useSelector((store) => store.results);

    // map over results array, making sure there are actually
    //  values present before mapping so as not to crash DOM
    return (
        <>
            {results && results.items?.map((book, i) => (
                <div key={i}>
                    <SearchBook book={book} />
                </div>
            ))}
        </>
    )
}

export default SearchList;