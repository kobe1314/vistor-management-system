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
    ],
    count: {
        total: 0,
        attendance: 0,
        absent: 0
    },
    totalPages: 0
}

const filterRecordsResponse = (state,resp) => {
    const datas = resp.result.data.content;
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
    const attendanceNum = datas.filter(data => {
        if(data.attendanceStatus === '1') {
            return data;
        }
    })
    const absent = datas.length - attendanceNum.length;

    const count = {
        total: datas.length,
        attendance: attendanceNum.length,
        absent
    }

    const totalPages = resp.result.data.totalPages;

    return {...state, status: SUCCESS,records,count,totalPages};

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

