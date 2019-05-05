import {fetchRecordAPI,fetchDepartmentInfo} from '../../actions/action';
import Records from './Records';
import { connect } from 'react-redux';

const mapDispatherToProps = (dispatch) => {
    return {
        fetchRecords: (params) => {
            dispatch(fetchRecordAPI(params))
        },
        fetchDepartmentInfo: () => {
            dispatch(fetchDepartmentInfo())
        }
    }
}

const mapStatusToProps = (state) => {
    console.log('records mapStatusToProps:',state);
    return {
        data: state.records,
        departments:state.departmentsInfo
    }
}

export default connect(mapStatusToProps,mapDispatherToProps )(Records);