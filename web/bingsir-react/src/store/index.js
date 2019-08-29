import { createStore, compose, applyMiddleware } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';//thunk插件的作用，可以返回函数  过一段时间再执行 Reducer
import rootReducers from "./reducers/index"
const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(...[thunk]),
        composeWithDevTools()
    ),
);//创建store

export default store;
