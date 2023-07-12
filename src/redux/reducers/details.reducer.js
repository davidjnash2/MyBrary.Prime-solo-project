// handles incoming data from server GET for individual book data, and stores it in state
const detailsReducer = (state = [], action) => {
    if (action.type === 'SET_DETAILS') {
        console.log('IN details reducer SET_DETAILS, and action.payload is:', action.payload);
        return action.payload
    }
    return state;
}


export default detailsReducer;