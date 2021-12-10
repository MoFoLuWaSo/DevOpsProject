import {
    EXPIRES_SIGNATURE,
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    INIT_URL, SET_APP_AUTHORIZATION, SET_SUBSCRIPTIONS,
    SIGNOUT_USER_SUCCESS,
    USER_DATA,

} from "../../constants/ActionTypes";
import {fetchRecords} from "./Common";
import {USER} from "../../constants/ServerUrl";


export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const setExpiresSignature = (params) => {
    return {
        type: EXPIRES_SIGNATURE,
        payload: params
    };
};


export const setToken = (params) => {
    return {
        type: EXPIRES_SIGNATURE,
        payload: params
    };
};


export const getUser = (location = "/") => {
    // console.log();
    //  let token = JSON.parse(localStorage.getItem("token"));
    //  axios.defaults.headers.common['Accept'] = " application/json";
//    axios.defaults.headers.common['Authorization'] = "Bearer " + token;

    return (dispatch) => {
        dispatch({type: FETCH_START});

        fetchRecords(USER).then(res => {
            if (res.success) {
                dispatch({type: FETCH_SUCCESS});
                dispatch({type: USER_DATA, payload: res.user});
            } else {
                dispatch({type: FETCH_ERROR, payload: 'Problem verifying your identity'});
               // window.location.reload();

            }
        }).catch(err => {
            dispatch({type: FETCH_ERROR, payload: 'Error'});
          //  window.location.reload();
            console.log(err);
        });
    }
};


export const userSignOut = () => {
    //let token = JSON.parse(localStorage.getItem("token"));

    // axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    return (dispatch) => {
        dispatch({type: FETCH_START});

        axios.post('/logout').then(({data}) => {
            console.log("log out", data)
            if (data.success) {

                dispatch({type: FETCH_SUCCESS});
                dispatch({type: SIGNOUT_USER_SUCCESS});
            } else {

                dispatch({type: FETCH_ERROR, payload: data.error});
                dispatch({type: SIGNOUT_USER_SUCCESS});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});

            dispatch({type: SIGNOUT_USER_SUCCESS});
            console.log("Error****:", error.message);
        });
    }
};


export const setApplicationAuthorization = (authorization) => {

    return {
        type: SET_APP_AUTHORIZATION,
        payload: authorization
    };
};

export const setSubscriptions = (subscriptions) => {

    return {
        type: SET_SUBSCRIPTIONS,
        payload: subscriptions
    };
};
