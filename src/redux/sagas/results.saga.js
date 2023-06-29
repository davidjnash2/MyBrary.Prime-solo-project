import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchResults(action) {

    try {
        const results = yield axios.get(`/api/search/${action.payload}`)
        console.log('CLIENT API SEARCH ', action.payload);
        yield put({
            type: "SET_RESULTS",
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