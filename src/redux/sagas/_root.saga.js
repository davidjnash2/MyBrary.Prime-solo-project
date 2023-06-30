import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import resultsSaga from './results.saga';
import postSaga from './post.saga';
import librarySaga from './library.saga';
import deleteSaga from'./delete.saga';


export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    resultsSaga(),
    postSaga(),
    librarySaga(),
    deleteSaga(),
  ]);
}
