import axios from 'axios';
import { returnErrors } from './errorActions'

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//check token and load user

export const loadUser = () => (dispatch, getState) => {
    //user Loading
    dispatch({ type: USER_LOADING});

    axios
        .get('/api/auth', tokenConfig(getState))
        .then( res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//register User
export const register = ({ username, password }) => dispatch => {
    
    //request body
    const user = JSON.stringify({ user: username, password });
    console.log('user', user)
    axios
    .post('http://localhost:4444/api/auth/register', user)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    
    .catch(err => {
        dispatch(
            returnErrors(err.response,  'REGISTER_FAIL')
        );
        dispatch({
            type: REGISTER_FAIL
        });
    });
}

// set up config/headers and token

export const tokenConfig = getState => {

    //GET Token from loacalstoreage
    const token = getState().auth.token

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // if Token then add to headers
    if(token) {
        config.headers['x-auth-token'] = token
    }

    return config;
}