import {LOADING,SUCCESS,FAIL} from '../actions/status';
import {FETCH_RECORD_STARTED, FETCH_RECORD_SUCCESS, FETCH_RECORD_FAIL} from '../actions/actionType';

const initalState = {
    status : '', 
    records: [
        {
            attendanceIdentityCardNumber: '',
            attendanceName: '',
            attendanceDate: '',
            attendanceCompany: '',
            attendanceDepart: '',
            attendanceAccessCardNumber: '',
            attendanceDuration: '',
            attendanceStatus:''
        }
    ]
}

const filterRecordsResponse = (state,resp) => {
    const datas = resp.result.data;
    const records = datas.map(data => {
        const {attendanceCompany, attendanceDepart, attendanceAccessCardNumber,attendanceDuration, attendanceStatus} = data;
        return {
            attendanceIdentityCardNumber: data.attendanceKey.attendanceIdentityCardNumber,
            attendanceDate: data.attendanceKey.attendanceDate,
            attendanceName: data.attendanceKey.attendanceName,
            attendanceCompany,
            attendanceDepart,
            attendanceAccessCardNumber,
            attendanceDuration,
            attendanceStatus
        }
    })

    return {...state, status: SUCCESS,records};

}

export const recordsReducer = (state = initalState, action) => {

    switch(action.type) {
        case FETCH_RECORD_STARTED : {
            return {...state,status: LOADING};
        }

        case FETCH_RECORD_SUCCESS : {
            return filterRecordsResponse(state,action);
        }

        case FETCH_RECORD_FAIL : {
            return {...state, status: FAIL, ...action.error}
        }
        default: 
         { return state }
    }
}

