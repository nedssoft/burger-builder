import axios from 'axios'
import * as types from './types'

const apiKey = 'AIzaSyDeYFbP9xNjhdeT3X-iKrsdC0lCzS2pPIs'
const AUTH_SIGNUP_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
const AUTH_SIGNIN_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`
export const authStart = () => {
  return {
    type: types.AUTH_START
  }
}
export const authFailed = (error) => {
  return {
    type: types.AUTH_FAILED,
    error
  }
}

export const authSuccess = (authData) => {
  return {
    type: types.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId
  }
}
export const authLogout = () => {
  localStorage.removeItem('token');
  return {
    type: types.AUTH_LOGOUT,
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(authLogout())
  }
}
const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(()=> {
      dispatch(authLogout())
    }, expirationTime * 1000)
  }
}
export const auth = (email, password, isSignUp = true) => {
  const url = isSignUp ? AUTH_SIGNUP_URL : AUTH_SIGNIN_URL;
  return dispatch => {
    dispatch(authStart())
    axios.post(url, {
      email,
      password,
      returnSecureToken: true
    })
    .then( res => {
      localStorage.setItem('token', res.data.idToken)
      dispatch(authSuccess(res.data))
      dispatch(checkAuthTimeout(res.data.expiresIn))
    })
    .catch(err => {
      dispatch(authFailed(err.message))
    })
  }
}