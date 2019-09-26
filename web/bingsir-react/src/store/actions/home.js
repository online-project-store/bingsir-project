import * as types from "./action-types";

/* export default {
    increment() {
        return {
            type: types.INCREMENT
        }
    },
    decrement() {
        return {
            type: types.DECREMENT
        }
    }
} */



export const userinfo = (data) => ({
    type: types.USER_INFO,
    payload:{
        info: data
    }
})