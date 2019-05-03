import {
    LOADING,
    SUCCESS,
    FAIL
} from '../actions/status';
import {
    FETCH_SUMMARIES_STARTED,
    FETCH_SUMMARIES_SUCCES,
    FETCH_SUMMARIES_FAIL
} from '../actions/actionType';



const initalState = {
    status: '',
    summaries: [{
        attendanceCompany: '',
        attendanceDate: '',
        attendanceName: '',
        attendanceDepart: '',
        attendanceIdentityCardNumber: '',
        attendanceAccessCardNumber: '',
        first: '',
        second:'',
        third: '',
        fourth:'',
        fifth: '',
        sixth:'',
        seventh: '',
        eighth:'',
        ninth: '',
        tenth:'',
        eleventh: '',
        twelfth:'',
        thirteenth: '',
        fourteenth:'',
        fifteenth: '',
        sixteenth:'',
        seventeenth: '',
        eighteenth:'',
        nineteenth: '',
        twentieth:'',
        twentyfirst: '',
        twentysecond:'',
        twentythird: '',
        twentyfourth:'',
        twentyfifth: '',
        twentysixth:'',
        twentyseventh: '',
        twentyeighth:'',
        twentyninth: '',
        thirtieth:'',
        thirtyfirst: '',
        attendanceDay: ''
    }],
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

const filterSummariesResponse = (state, resp) => {
    const datas = resp.result.data.page.content;
    const summaries = datas.map(data => {
        const {attendanceCompany,attendanceProfession,attendanceAccessCardNumber} = data;
        const {attendanceName,attendanceMonth,attendanceIdentityCardNumber} = data.monthlyAttendanceKey;
        return {
            attendanceCompany,
            attendanceDate: attendanceMonth,
            attendanceName,
            attendanceDepart:attendanceProfession,
            attendanceIdentityCardNumber,
            attendanceAccessCardNumber,
            first: data.attendanceNo1,
            second:data.attendanceNo2,
            third: data.attendanceNo3,
            fourth:data.attendanceNo4,
            fifth: data.attendanceNo5,
            sixth:data.attendanceNo6,
            seventh: data.attendanceNo7,
            eighth:data.attendanceNo8,
            ninth: data.attendanceNo9,
            tenth:data.attendanceNo10,
            eleventh: data.attendanceNo11,
            twelfth:data.attendanceNo12,
            thirteenth: data.attendanceNo13,
            fourteenth:data.attendanceNo14,
            fifteenth: data.attendanceNo15,
            sixteenth:data.attendanceNo16,
            seventeenth: data.attendanceNo17,
            eighteenth:data.attendanceNo18,
            nineteenth: data.attendanceNo19,
            twentieth:data.attendanceNo20,
            twentyfirst: data.attendanceNo21,
            twentysecond:data.attendanceNo22,
            twentythird: data.attendanceNo23,
            twentyfourth:data.attendanceNo24,
            twentyfifth: data.attendanceNo25,
            twentysixth:data.attendanceNo26,
            twentyseventh: data.attendanceNo27,
            twentyeighth:data.attendanceNo28,
            twentyninth: data.attendanceNo29,
            thirtieth:data.attendanceNo30,
            thirtyfirst: data.attendanceNo31,
            attendanceDay: data.attendanceDays
        }
    })

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

    return {
        ...state,
        status: SUCCESS,
        summaries,
        count,
        pageInfo
    };

}

export const summariesReducer = (state = initalState, action) => {

    switch (action.type) {
        case FETCH_SUMMARIES_STARTED:
            {
                return {
                    ...state,
                    status: LOADING
                };
            }

        case FETCH_SUMMARIES_SUCCES:
            {
                return filterSummariesResponse(state, action);
            }

        case FETCH_SUMMARIES_FAIL:
            {
                return {
                    ...state,
                    status: FAIL,
                    ...action.error
                }
            }
        default:
            {
                return state
            }
    }
}