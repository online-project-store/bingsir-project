import obj from "../initState/index";
const stateReducer = (state = obj, action) => {
    switch (action.type) {
        case 'SET_MODAL_LOGIN':
            return {
                modalLogin: action.payload.modelLogin
            }
            default:
                return state;
    }
}

export default stateReducer;
