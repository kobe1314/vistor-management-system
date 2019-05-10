import { put,call,takeLatest,delay } from 'redux-saga/effects';
import {FETCH_RECORD_API} from '../actions/actionType';
import {fetchRecordStarted, fetchRecordSuccess, fetchRecordFail} from '../actions/action'
import {fetchAPI} from '../services/enhancedRequest';

function* fetchRecords(action) {
    const apiUrl = '/vr/queryDailyAttendance';
    try{
        console.log('records acton :',action);
        yield put(fetchRecordStarted());
        // call one api
        const response = yield call(fetchAPI,apiUrl,action.params);
        console.log('fetchRecords', response);
        yield delay(2000);
        yield put(fetchRecordSuccess(response))
    } catch (error) {
        console.log(error);
        yield put(fetchRecordFail(error))
    }
}

function* recordsSaga() {
    yield takeLatest(FETCH_RECORD_API,fetchRecords);
}

export {
    recordsSaga
}
