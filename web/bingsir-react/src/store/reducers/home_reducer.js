import obj from "../initState/index";
const homeReducer = (state = obj, action) => {
    
    switch (action.type) {
        case 'USER_INFO':
            return {
                ...state, //更新state数据
                user_info: action.payload
            }
        case 'CLIENT_NUM':
            return {
                ...state, //更新state数据
                clientHeight: action.payload.clientHeight
            }
        case 'ARTICLE_INFO':
            return {
                ...state, //更新state数据
                article_info: action.payload.articleInfo
            }
        default:
            return state;
    }
}

export default homeReducer;
