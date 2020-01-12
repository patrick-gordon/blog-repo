import { GET_USER } from './types';
import axios from 'axios';
import {tokenConfig} from './authActions'





export const getUsers = () => (dispatch, getState) => {
    dispatch(setPostsLoading());
    axios
      .get('/api/users/:username', tokenConfig(getState))
      .then(res =>
           dispatch({
          type: GET_USER,
          payload: res.data
          }) 
      )
  };