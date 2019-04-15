import { combineReducers } from 'redux';
import changeBread from './changeBread';
import { recordsReducer as records} from './records';
import { summariesReducer as summaries} from './summaries';

export default combineReducers({ changeBread, records, summaries});



