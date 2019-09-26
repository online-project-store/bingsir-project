import obj from "../initState/index";
const userReducer = (state = obj, action) => {
    
    switch (action.type) {
        case 'USER_INFO':
            return {
                    //...state, //更新state数据
                user_info: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
