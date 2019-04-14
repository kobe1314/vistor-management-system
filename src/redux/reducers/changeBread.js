import { CHANGE_bread} from '../actionTypes';

const defaultState = {
    breadText:'考情记录'
}

export default function(state=defaultState, action) {
    debugger
    switch (action.type) {
        case CHANGE_bread: {
            const { breadText } = action.payload;
            console.log('--content--:',breadText);
            console.log('--state--:', state);
            return {
                breadText
            };
        }
        default:
        return state;
    }
}
