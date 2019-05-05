import {fetchSummariesAPI,fetchDepartmentInfo} from '../../actions/action';
import Summaries from './Summaries';
import { connect } from 'react-redux';
const mapDispatherToProps = (dispatch) => {
    return {
        fetchSummaries: (params) => {
            dispatch(fetchSummariesAPI(params))
        },
        fetchDepartmentInfo: () => {
            dispatch(fetchDepartmentInfo())
        }
    }
}

const mapStatusToProps = (state) => {
    return {
        data: state.summaries,
        departments:state.departmentsInfo
    }
}



export default connect(mapStatusToProps,mapDispatherToProps )(Summaries);