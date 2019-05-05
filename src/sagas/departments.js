import { put,call,takeLatest } from 'redux-saga/effects';
import {FETCH_DEPARTMENT_API} from '../actions/actionType';
import {fetchDepartmentInfoSuccess, fetchDepartmentInfoFail} from '../actions/action';
import {fetchAPI} from '../services/enhancedRequest';

function* fetchDepartments(action) {
    const apiUrl = '/vr/queryAllDepartments';
    try{
        console.log('departments acton :',action);
        // call one api
        const response = yield call(fetchAPI,apiUrl);
        console.log(response);
        yield put(fetchDepartmentInfoSuccess(response))
    } catch (error) {
        console.log(error);
        yield put(fetchDepartmentInfoFail(error))
    }
}

function* departmentsSaga() {
    yield takeLatest(FETCH_DEPARTMENT_API,fetchDepartments);
}

export {
    departmentsSaga
}
