import axios from 'axios';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchResults() {

    try {
        const results = yield call(axios.get('/api/search'))
        console.log('search API with client ', results);
        yield put({
            type: "SET_RESULTS",
            payload: data
        })
    }
    catch (error) {
        console.log('Error with fetchResults saga.', error);

    }
}

function* resultsSaga() {
    yield takeLatest('FETCH_RESULTS', fetchResults);
}


export default resultsSaga;