import { all } from 'redux-saga/effects';
import { recordsSaga } from './records';
import { summariesSaga } from './summaries';

export default function* rootSaga() {
    yield all([
        recordsSaga(),
        summariesSaga()
    ])
}
