import {fetchRecordAPI} from '../../actions/action';
import Records from './Records';
import { connect } from 'react-redux';

const mapDispatherToProps = (dispatch) => {
    return {
        fetchRecords: (params) => {
            dispatch(fetchRecordAPI(params))
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