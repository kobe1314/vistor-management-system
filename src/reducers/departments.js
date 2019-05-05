import { FETCH_DEPARTMENT_SUCCES} from '../actions/actionType';

const initalState = {
    departments: [
        {
            departmentName: ''
        }
    ]
}

const filterDepartmentsInfoResponse = (state,resp) => {
    const datas = resp.result.data;
    const departments = datas.map(data => {
        const {name} = data;
        return {
            departmentName:name
        }
    })

    return {...state,departments}
}

export const departmentsInfoReducer = (state = initalState, action) => {

    switch(action.type) {
        case FETCH_DEPARTMENT_SUCCES : {
            return filterDepartmentsInfoResponse(state,action);
        }

        default:
         { return state }
    }
}
