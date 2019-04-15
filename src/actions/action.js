import {
    FETCH_RECORD_STARTED,
    FETCH_RECORD_SUCCESS,
    FETCH_RECORD_FAIL,
    CHANGE_BREAD,
    FETCH_SUMMARIES_STARTED,
    FETCH_SUMMARIES_SUCCES,
    FETCH_SUMMARIES_FAIL
} from './actionType';


const fetchRecordStarted = () => ({
    type: FETCH_RECORD_STARTED
})

const fetchRecordSuccess = (result) => ({
    type: FETCH_RECORD_SUCCESS,
    result
})

const fetchRecordFail = (error) => ({
    type: FETCH_RECORD_FAIL,
    error
})

const fetchSummariesStarted = () => ({
    type: FETCH_SUMMARIES_STARTED
})

const fetchSummariesSuccess = (result) => ({
    type: FETCH_SUMMARIES_SUCCES,
    result
})

const fetchSummariesFail = (error) => ({
    type: FETCH_SUMMARIES_FAIL,
    error
})

const changeBread = breadText => ({
    type: CHANGE_BREAD,
    payload: {
        breadText: breadText
    }
});

export {
    fetchRecordStarted,
    fetchRecordSuccess,
    fetchRecordFail,
    changeBread,
    fetchSummariesStarted,
    fetchSummariesSuccess,
    fetchSummariesFail
}