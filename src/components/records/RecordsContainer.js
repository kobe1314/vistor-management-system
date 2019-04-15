import {FETCH_RECORD_API} from '../../actions/actionType';
import Records from './Records';
import { connect } from 'react-redux';
const mapDispatherToProps = (dispatch) => {
    return {
        fetchRecords: () => {
            dispatch({
                type: FETCH_RECORD_API
            })
        }
    }
}

const mapStatusToProps = (state) => {
    console.log('records mapStatusToProps:',state);
    return {
        data: state.records
    }
}



export default connect(mapStatusToProps,mapDispatherToProps )(Records);