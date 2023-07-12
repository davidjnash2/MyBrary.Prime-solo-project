import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import resultsSaga from './results.saga';
import postSaga from './post.saga';
import librarySaga from './library.saga';
import deleteSaga from'./delete.saga';
import updateSaga from './update.saga';
import detailsSaga from './details.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    resultsSaga(), // for results from API search/GET
    postSaga(), // for POSTing new books to user library
    librarySaga(), // for server GET of full user library
    deleteSaga(), // for DELETE of user book
    updateSaga(), // for update PUT of book data from user inputs
    detailsSaga(), // for GET of individual book details from server
  ]);
}
