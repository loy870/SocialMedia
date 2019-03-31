import {GET_PROFILE, PROFILE_LOADING} from '../actions/types';

const initialState ={
    profile: null,
    profiles: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action){
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                payload: action.payload,
                loading: false
            }
        default:
            return state;
        
    }
}