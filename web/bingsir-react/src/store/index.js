//redux使用方法
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';//thunk插件的作用，可以返回函数  过一段时间再执行 Reducer
import reducer from "./reducers/index"
const store = createStore(
    reducer,
    compose(
        applyMiddleware(...[thunk]),
        window.devToolsExtension ? composeWithDevTools() : f => f
    ),
);//创建store

export default store;
