import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// listens for 'UPDATE_USER_BOOK' action dispatches, 
// sends axios put to server along with id as url parameter, and update info
// also dispatches action to update reducer to update state
function* updateBook(action) {
    try {
        console.log('IN CLIENT DB updateSaga, AND action.payload is:', action.payload);
        const bookUpdates = action.payload;
        yield axios.put(`/api/database/update/${72}`, bookUpdates);
        yield put({
            type: 'SET_UPDATE',
            payload: bookUpdates
        })
    }
    catch (error) {
        console.log('ERROR WITH updateSaga.', error);

    }
}

function* updateSaga() {
    yield takeEvery('UPDATE_USER_BOOK', updateBook);
}

export default updateSaga;  