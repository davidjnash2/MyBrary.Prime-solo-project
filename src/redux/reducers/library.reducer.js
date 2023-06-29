const libraryReducer = (state = [], action) => {
    if (action.type === 'SET_LIBRARY') {
        return action.payload
    }
    return state;
}

export default libraryReducer;