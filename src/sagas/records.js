import { put,call,takeLatest,delay } from 'redux-saga/effects';
import {FETCH_RECORD_API} from '../actions/actionType';
import {fetchRecordStarted, fetchRecordSuccess, fetchRecordFail} from '../actions/action'
import {fetchRecordsAPI} from '../services/enhancedRequest';

function* fetchRecords(action) {
    const apiUrl = '/vr/queryDailyAttendance';
    try{
        console.log('records acton :',action);
        yield put(fetchRecordStarted());
        // call one api
        const response = yield call(fetchRecordsAPI,apiUrl,action.params);
        console.log(response);
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

// function* filterRecords(option){
    
//     const apiUrl = '/vr/filterRecords';
//     console.log('filter record saga',option);
//     try{
//         yield put({type:FETCH_RECORD_STARTED});
//         const response = yield call(fetchFilterRecordAPI,apiUrl,option);
//         console.log(response);
//         // yield delay(2000);
//         // yield put({type: FETCH_RECORD_SUCCESS, result : response});
//     }catch (error) {
//         console.log(error);
//         yield put({type: FETCH_RECORD_FAIL, error})
//     }
// }

// function* filterRecordSaga(){
//     yield takeLatest(FILTER_RECORD_API,filterRecords);
// }

export {
    recordsSaga
    // filterRecordSaga
}
