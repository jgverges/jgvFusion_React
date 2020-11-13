import {DISHES} from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {
        dishes : DISHES,
        leaders: LEADERS,
        promotions : PROMOTIONS,
        comments : COMMENTS
};

export const Reducer = (state=initialState, actions) =>{
    return state;
}