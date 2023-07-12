// this reducer handles all results from API GET, holds in state
const resultsReducer = (state = [], action) => {
    if (action.type === 'SET_RESULTS') {
        return action.payload
    }
    return state;
}

export default resultsReducer;
