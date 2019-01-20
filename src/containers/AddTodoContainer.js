import {
    connect
} from 'react-redux';
import AddToDo from '../components/AddToDo';
import { addTodo } from '../actions/index';


const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeVal: (inputValue) => dispatch(addTodo(inputValue))
})

export default connect(null, mapDispatchToProps)(AddToDo);