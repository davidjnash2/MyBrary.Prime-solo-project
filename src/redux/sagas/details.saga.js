import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


// listens for 'FETCH_DETAILS'
// get details for specified book
// put/dispatch to set retrieved data to details 
// reducer to hold data in state
function* fetchDetails(action) {
    try {
        console.log('CLIENT fetchDetails SAGA pinged with this id', action.payload);
        const details = yield axios.get(`/api/database/details/${action.payload}`);
        console.log('get details:', details.data);
        yield put({ type: 'SET_DETAILS', payload: details.data });
    } catch {
        console.log('error in fetchDetails get');
    };
}

function* detailsSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails);
}

export default detailsSaga;    