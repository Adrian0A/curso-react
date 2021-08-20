import * as ActionTypes from './ActionTypes';

export const Comments = (state = {errmes:null, comments:[]}, action) => {
    switch (action.type) {
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errmes: action.payload,comment:[]};
        
        case ActionTypes.ADD_COMMENTS:
            return {...state,errmes:null, comments:action.payload};

        
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return {...state, errmes:null, comments:state.comments.concat(comment)} ;
        
        default:
            return state;
    }
};