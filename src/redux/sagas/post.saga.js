import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* postBook(action) {

    try {
        const newBook=
        yield axios.post('/api/database')
        console.log('IN CLIENT DB postSaga, AND action.payload is:', action.payload);
        yield put({
            type: "SET_BOOK",
            payload: results.data
        })
    }
    catch (error) {
        console.log('ERROR WITH postSaga.', error);

    }
}

function* postSaga() {
    yield takeEvery('ADD_BOOK', postBook);
}


export default postSaga;