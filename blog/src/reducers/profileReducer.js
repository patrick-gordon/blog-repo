import { GET_USERS } from '../actions/types'

const initialState = {
    user: {},
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type){
        case GET_USERS:
        return{
            ...state,
            user: action.payload,
            loading: false  
        };
    }
}