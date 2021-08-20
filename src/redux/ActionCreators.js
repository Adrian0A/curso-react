import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { actionTypes } from 'react-redux-form';

export const addComment = (dishId,rating,author,comment) =>({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});


export const fecthDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));

};

export const dishesLoading = () => ({
    type:ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmes) => ({
    type:ActionTypes.DISHES_FAILED,
    payload:errmes
});

export const addDishes = (dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fecthComments = () => (dispatch) =>{
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmes) => ({
    type:ActionTypes.COMMENTS_FAILED,
    payload: errmes
});

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fecthPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
};

export const addPromos = (promos)=>({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
});

export const promosLoading = () =>({
    type:ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmes) => ({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmes
});
