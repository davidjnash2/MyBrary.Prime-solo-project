import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchUserLibrary() {
    // get all user books from the DB
    // dispatch to movies reducer to hold all in state
    try {
        const library = yield axios.get('/api/database');
        console.log('fetchLibrary GET results are', library.data);
        yield put({
            type: 'SET_LIBRARY',
            payload: library.data
        });
    } catch {
        console.log('Error with fetchLibrary');
    };
}

function* librarySaga() {
    yield takeEvery('FETCH_LIBRARY', fetchUserLibrary);
}

export default librarySaga;