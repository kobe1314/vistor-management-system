import { put,call,takeLatest,delay } from 'redux-saga/effects';
import {FETCH_RECORD_STARTED, FETCH_RECORD_SUCCESS, FETCH_RECORD_FAIL,FETCH_RECORD_API} from '../actions/actionType';
import {fetchRecordsAPI} from '../services/enhancedRequest';

function* fetchRecords(action) {
    const apiUrl = '/vr/queryDailyAttendance';
    try{
        console.log('records acton :',action);
        yield put({type:FETCH_RECORD_STARTED});
        // call one api
        const response = yield call(fetchRecordsAPI,apiUrl);
        console.log(response);
        yield delay(2000);
        yield put({type: FETCH_RECORD_SUCCESS, result : response})
    } catch (error) {
        console.log(error);
        yield put({type: FETCH_RECORD_FAIL, error})
    }    
    
}

function* recordsSaga() {
    yield takeLatest(FETCH_RECORD_API,fetchRecords);
}

export {
    recordsSaga
}
