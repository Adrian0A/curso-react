import * as ActionTypes from './ActionTypes';

export const Promotions = (state = { isLoading:true,
                                     promotions:[] ,
                                     errmes:null}, action) => {
    switch (action.type) {
        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading:false, promotions:[], errmes: action.payload};

        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading:true, promotions:[], errmes:null};

        case ActionTypes.ADD_PROMOS:
            return{...state, isLoading:false, promotions:action.payload, errmes:null};
        
        default:
            return state;
    }
};