import { CHANGE_BREAD} from '../actions/actionType';

const defaultState = {
    breadText:'考情记录'
}

export default function(state=defaultState, action) {
    // debugger
    switch (action.type) {
        case CHANGE_BREAD: {
            const { breadText } = action.payload;
            return {
                breadText
            };
        }
        default:
        return state;
    }
}
