import { GET_USERS } from './types';
import axios from 'axios';
import {tokenConfig} from './authActions'





export const getUsers = () => (dispatch, getState) => {
    dispatch();
    axios
      .get('/api/users/:username', tokenConfig(getState))
      .then(res =>
           dispatch({
          type: GET_USERS,
          payload: res.data
          }) 
      )
  };