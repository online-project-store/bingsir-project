import { combineReducers } from 'redux';

import homeReducer from "./home_reducer";
// import post from "./post_reducer"

//通过combineReducers把多个reducre进行合并



const rootReducers = combineReducers({
    homeReducer
})

export default rootReducers;
