import { all } from 'redux-saga/effects';
import { recordsSaga } from './records';
import { summariesSaga } from './summaries';
import { departmentsSaga } from './departments';



export default function* rootSaga() {
    yield all([
        recordsSaga(),
        summariesSaga(),
        departmentsSaga()
    ])
}
