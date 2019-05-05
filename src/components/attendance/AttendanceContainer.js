import { connect } from 'react-redux';
import Attendance from './Attendance';
import {fetchDepartmentInfo} from '../../actions/action';


const mapDispatherToProps = (dispatch) => {
    return {
        fetchDepartmentInfo: () => {
            dispatch(fetchDepartmentInfo())
        }
    }
}

const mapStatusToProps = (state) => {
    return {
        data: state.departmentsInfo
    }
}



export default connect(mapStatusToProps,mapDispatherToProps )(Attendance);