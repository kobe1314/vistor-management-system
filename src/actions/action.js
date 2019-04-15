import {FETCH_RECORD_STARTED, FETCH_RECORD_SUCCESS, FETCH_RECORD_FAIL,CHANGE_BREAD} from './actionType';

const fetchRecordStarted = (action) => ({
    type : FETCH_RECORD_STARTED,
    cityCode: action.cityCode
})

const fetchRecordSuccess = (result) => ({
    type : FETCH_RECORD_SUCCESS,
    result
})

const fetchRecordFail = (error) => ({
    type : FETCH_RECORD_FAIL,
    error
})

const changeBread = breadText => ({
    type: CHANGE_BREAD,
    payload: {
      breadText:breadText
    }
});

export {
    fetchRecordStarted,
    fetchRecordSuccess,
    fetchRecordFail,
    changeBread
}