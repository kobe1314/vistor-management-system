import {LOADING,SUCCESS,FAIL} from '../actions/status';
import {FETCH_RECORD_STARTED, FETCH_RECORD_SUCCESS, FETCH_RECORD_FAIL} from '../actions/actionType';

const initalState = {
    status : LOADING, 
    records: [
        {
            attendanceIdentityCardNumber: '',
            attendanceName: '',
            attendanceDate: '',
            attendanceDepart: '',
            attendanceAccessCardNumber: '',
            attendanceDuration: '',
            attendanceStatus:''
        }
    ]
}
export const recordsReducer = (state = initalState, action) => {

    switch(action.type) {
        case FETCH_RECORD_STARTED : {
            return {...state,status: LOADING};
        }

        case FETCH_RECORD_SUCCESS : {
            return {...state, status: SUCCESS, ...action.result};
        }

        case FETCH_RECORD_FAIL : {
            return {...state, status: FAIL, ...action.error}
        }
        default: 
         { return state }
    }
}