import {AUTH_USER_LOGOUT, AUTH_USER_SUCCESS} from "../actions/actionTypes";

const initialState = {
    token: null,
    username: '',
    userInfo: {}
};

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                token: action.token,
                username: action.username,
                userInfo: action.userInfo
            };
        case AUTH_USER_LOGOUT:
            return {
                ...state,
                token: null,
                username: '',
                userInfo: {}
            };
        default:
            return state
    }
}