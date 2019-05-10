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
        totalNumber: 0,
        totalNormalNumber: 0,
        totalAbnormalNumber: 0
    },
    pageInfo: {
        totalPages: 0,
        currentPage: 1,
        showBeginIndex:0
    }
}

const filterRecordsResponse = (state,resp) => {
    const datas = resp.result.data.page.content;
    debugger
    const records = datas;
    // datas.map(data => {
    //     const {attendanceCompany, attendanceDepart, attendanceAccessCardNumber,attendanceDuration, attendanceStatus} = data;
    //     return {
    //         attendanceIdentityCardNumber: data.attendanceKey.attendanceIdentityCardNumber,
    //         attendanceDate: data.attendanceKey.attendanceDate,
    //         attendanceName: data.attendanceKey.attendanceName,
    //         attendanceCompany,
    //         attendanceDepart,
    //         attendanceAccessCardNumber,
    //         attendanceDuration,
    //         attendanceStatus
    //     }
    // })

    const {totalNumber, totalNormalNumber,totalAbnormalNumber} = resp.result.data;

    const count = {
        totalNumber,
        totalNormalNumber,
        totalAbnormalNumber
    }

    const { totalPages, number }= resp.result.data.page;
    const pageInfo = {
        totalPage:totalPages,
        currentPage:number+1,
        showBeginIndex: number*20 //show number for per page
    }

    return {...state, status: SUCCESS, records, count, pageInfo};

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

