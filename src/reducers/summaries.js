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
    }]
}

const filterSummariesResponse = (state, resp) => {
    const datas = resp.result.data;
    const summaries = datas.map(data => {
        return {
            attendanceCompany: data[1],
            attendanceDate: data[2],
            attendanceName: data[3],
            attendanceDepart:data[4],
            attendanceIdentityCardNumber: data[5],
            attendanceAccessCardNumber: data[6],
            first: data[7],
            second:data[8],
            third: data[9],
            fourth:data[10],
            fifth: data[11],
            sixth:data[12],
            seventh: data[13],
            eighth:data[14],
            ninth: data[15],
            tenth:data[16],
            eleventh: data[17],
            twelfth:data[18],
            thirteenth: data[19],
            fourteenth:data[20],
            fifteenth: data[21],
            sixteenth:data[22],
            seventeenth: data[23],
            eighteenth:data[24],
            nineteenth: data[25],
            twentieth:data[26],
            twentyfirst: data[27],
            twentysecond:data[28],
            twentythird: data[29],
            twentyfourth:data[30],
            twentyfifth: data[31],
            twentysixth:data[32],
            twentyseventh: data[33],
            twentyeighth:data[34],
            twentyninth: data[35],
            thirtieth:data[36],
            thirtyfirst: data[37],
            attendanceDay: data[38]
        }
    })

    return {
        ...state,
        status: SUCCESS,
        summaries
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