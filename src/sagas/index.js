import { all } from 'redux-saga/effects';
import { recordsSaga } from './records';

export default function* rootSaga() {
    yield all([
        recordsSaga()
    ])
}
