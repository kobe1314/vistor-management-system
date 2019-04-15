import {FETCH_SUMMARIES_API} from '../../actions/actionType';
import Summaries from './Summaries';
import { connect } from 'react-redux';
const mapDispatherToProps = (dispatch) => {
    return {
        fetchSummaries: () => {
            dispatch({
                type: FETCH_SUMMARIES_API
            })
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