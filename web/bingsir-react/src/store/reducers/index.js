import { combineReducers } from 'redux';

import counter from "./counter_reducer";
// import post from "./post_reducer"

//通过combineReducers把多个reducre进行合并

const rootReducers = combineReducers({
    counter
})

export default rootReducers;
