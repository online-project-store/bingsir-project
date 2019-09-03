import obj from "../initState/index";
const counterReducer = (state = obj, action) => {
    
    switch (action.type) {
        case 'DEC':
            return {
                 //...state, //更新state数据
                count: state.count - action.payload.num
            }
            case 'COUNT_REDUCE':
                return {
                    // ...state,
                    count: state.count - 2
                }
            default:
                return state;
    }
}

export default counterReducer;
