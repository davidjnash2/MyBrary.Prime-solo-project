// this reducer will handle updating state for all changes to library
const libraryReducer = (state = [], action) => {
    // here, sets library for initial page load
    if (action.type === 'SET_LIBRARY') {
        return action.payload;
        // here, updates state to include new books added
    } else if (action.type === 'SET_BOOK') {
        return [...state, action.payload];
        // here, deletes from state the selected book
    } else if (action.type === 'DELETE_BOOK') {
        const deleteId = action.payload
        return state.filter((library) => library.id !== deleteId);
    }
    return state;
};

export default libraryReducer;
