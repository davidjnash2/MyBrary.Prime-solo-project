import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* postBook(action) {
    console.log('IN CLIENT DB postSaga, AND action.payload is:', action.payload);
    try {
        const newBook = action.payload;
        yield axios.post('/api/database', newBook);
        yield put({
            type: 'SET_BOOK',
            payload: newBook.data
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