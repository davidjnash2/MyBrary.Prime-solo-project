import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// listens for FETCH_RESULTS from client search input, to trigger
// API call with those search parameters
// dispatches to results reducer to hold returned results in state
function* fetchResults(action) {

    try {
        const results = yield axios.get(`/api/search/${action.payload}`)
        console.log('CLIENT API SEARCH ', action.payload);
        yield put({
            type: 'SET_RESULTS',
            payload: results.data
        })
    }
    catch (error) {
        console.log('ERROR WITH fetchResults SAGA.', error);

    }
}

function* resultsSaga() {
    yield takeEvery('FETCH_RESULTS', fetchResults);
}


export default resultsSaga;