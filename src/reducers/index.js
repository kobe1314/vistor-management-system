import { combineReducers } from 'redux';
import changeBread from './changeBread';
import { recordsReducer as records} from './records';
import { summariesReducer as summaries} from './summaries';
import { departmentsInfoReducer as departmentsInfo} from './departments';


export default combineReducers({ changeBread, records, summaries,departmentsInfo});



