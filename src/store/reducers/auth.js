import * as types from '../actions/types'

const initialState = {
  token: null,
  userId: null,
  isLoading: false,
  error: null,
  completed: false,
  isSignup: true,
}

const authReducer = (state = initialState, action) => {

  switch(action.type) {
    case types.AUTH_START:
      return {
        ...state,
        isLoading: true,
        completed: false,
        error:null,
        isSignup: action.isSignup
      }
    case types.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.token,
        userId: action.userId,
        completed: true,
        isSignup: action.isSignup
      }
    case types.AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        isSignup: true,
      }
    case types.AUTH_LOGOUT: 
      return {
        ...state,
        token: null,
        userId: null,
      }
    default:
      return state
  }
}

export default authReducer