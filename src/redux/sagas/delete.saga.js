import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// listens for 'DELETE_USER_BOOK' actions, 
// sends axios delete to server along with id as url parameter
// also dispatches action to library reducer to update state
function* deleteBook(action) {
    console.log('IN CLIENT DB deleteSaga, AND action.payload is:', action.payload);
    try {
        const deleteId = action.payload;
        yield axios.delete(`/api/database/delete/${deleteId}`);
        yield put({
            type: 'DELETE_BOOK',
            payload: deleteId
        })
    }
    catch (error) {
        console.log('ERROR WITH deleteSaga.', error);

    }
}

function* deleteSaga() {
    yield takeEvery('DELETE_USER_BOOK', deleteBook);
}

export default deleteSaga;    