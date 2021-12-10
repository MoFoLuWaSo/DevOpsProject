import {
    EXPIRES_SIGNATURE,
    INIT_URL, SET_APP_AUTHORIZATION, SET_SUBSCRIPTIONS,
    SIGNOUT_USER_SUCCESS,
    USER_DATA,
    USER_TOKEN_SET
} from "../../constants/ActionTypes";

const INIT_STATE = {
    token: JSON.parse(localStorage.getItem('token')),
    initURL: '',
    authUser: JSON.parse(localStorage.getItem('user')),
    params: {expires: '', signature: ''},
    authorizations: [],
    subscriptions: null,

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {


        case INIT_URL: {
            return {...state, initURL: action.payload};
        }

        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,
                token: null,
                authUser: null,
                initURL: ''
            }
        }

        case USER_DATA: {
            return {
                ...state,
                authUser: action.payload,
            };
        }

        case USER_TOKEN_SET: {
            return {
                ...state,
                token: action.payload,
            };
        }
        case EXPIRES_SIGNATURE: {
            return {
                ...state,
                params: action.payload,
            };
        }
        case SET_APP_AUTHORIZATION:
            return {
                ...state,
                authorizations: action.payload
            };

            case SET_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: action.payload
            };

        default:
            return state;
    }
}
