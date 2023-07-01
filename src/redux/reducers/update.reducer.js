// just getting start of reducer on page, 
// not yet finished, will need to update
// this further, spread?

const updateReducer = (state = [], action) => {
    if (action.type === 'SET_UPDATE') {
        return action.payload
    }
    return state;
}

export default updateReducer;