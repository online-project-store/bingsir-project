import obj from "../initState/index";
const counterReducer = (state = obj, action) => {
    // console.log(action);
    switch (action.type) {
        case 'COUNT_ADD':
            return {
                // ...state,
                count: state.count + 1
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
