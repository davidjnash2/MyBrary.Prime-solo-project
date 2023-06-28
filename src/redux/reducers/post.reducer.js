const resultsReducer = (state = [], action) => {
    if (action.type === '') {
        return action.payload
    }
    return state;
}

export default resultsReducer;