// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import SearchBook from '../SearchBook/SearchBook';

// function LibraryList() {

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch({
//             type: 'FETCH_LIBRARY'
//         })
//     }, []);

//     // access search results from global state via store
//     const library = useSelector((store) => store.library);

//     // map over results array, making sure there are actually
//     //  values present before mapping so as not to crash DOM
//     return (
//         <>
//             {library && library.items?.map((book, i) => (
//                 <div key={i}>
//                     <SearchBook book={book} />
//                 </div>
//             ))}
//         </>
//     )
// }

// export default LibraryList;