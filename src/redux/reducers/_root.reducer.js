import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import results from './results.reducer';
import library from './library.reducer';
import update from './update.reducer';
import details from './details.reducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  results, // handles api search results
  library, // handles user library
  update, // handles user input updates
  details, // handle book details
});

export default rootReducer;
