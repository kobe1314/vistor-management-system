import { put,call,takeLatest } from 'redux-saga/effects';
import {FETCH_SUMMARIES_STARTED, FETCH_SUMMARIES_SUCCES, FETCH_SUMMARIES_FAIL,FETCH_SUMMARIES_API} from '../actions/actionType';
import {fetchRecordsAPI} from '../services/enhancedRequest';


function* fetchSummaries(action) {
    const apiUrl = '/vr/queryMonthlyAttendance';
    try{
        console.log('fetchSummaries acton :',action);
        yield put({type:FETCH_SUMMARIES_STARTED});
        // call one api
        const response = yield call(fetchRecordsAPI,apiUrl,action.params);
        console.log('summaries response :',response);
        // yield delay(2000);
        yield put({type: FETCH_SUMMARIES_SUCCES, result : response})
    } catch (error) {
        console.log(error);
        yield put({type: FETCH_SUMMARIES_FAIL, error})
    }    
    
}

function* summariesSaga() {
    yield takeLatest(FETCH_SUMMARIES_API,fetchSummaries);
}

export {
    summariesSaga
}
