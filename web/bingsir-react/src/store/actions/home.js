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

let nextTodoId = 0;
export const addTodo = content => ({
    type: types.ADD_TODO,
    payload: {
        id: ++nextTodoId,
        content
    }
});
