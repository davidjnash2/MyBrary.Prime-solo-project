const libraryReducer = (state = [], action) => {
    if (action.type === 'SET_LIBRARY') {
      return action.payload;
    } else if (action.type === 'ADD_BOOK') {
      return [...state, action.payload];
    }
    return state;
  };
  
  export default libraryReducer;
  