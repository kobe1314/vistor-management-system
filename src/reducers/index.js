import { combineReducers } from 'redux';
import changeBread from './changeBread';
import { recordsReducer as records} from './records';

export default combineReducers({ changeBread, records});



