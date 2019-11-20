/* import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
 */
// import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./action-types";

export const getClientHeight = (num) => ({
  type: "CLIENT_NUM",
  payload: {
    clientHeight: num
  }
});
export const setModalLogin = (sign) => ({
  type: "SET_MODAL_LOGIN",
  payload: {
    modelLogin: sign
  }
});