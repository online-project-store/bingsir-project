import obj from "../initState/index";
const userReducer = (state = obj, action) => {
    
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
        default:
            return state;
    }
}

export default userReducer;
