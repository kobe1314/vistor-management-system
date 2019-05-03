import {fetchSummariesAPI} from '../../actions/action';
import Summaries from './Summaries';
import { connect } from 'react-redux';
const mapDispatherToProps = (dispatch) => {
    return {
        fetchSummaries: (params) => {
            dispatch(fetchSummariesAPI(params))
        }
    }
}

const mapStatusToProps = (state) => {
    console.log('summaries mapStatusToProps:',state);
    return {
        data: state.summaries
    }
}



export default connect(mapStatusToProps,mapDispatherToProps )(Summaries);