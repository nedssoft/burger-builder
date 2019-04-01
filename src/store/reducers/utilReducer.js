import * as actionTypes from '../actions/types'

const initialState = {
  error: false,
  isLoading: false,
}

const utilReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_FAILED:
    return {
      ...state,
      error: true, isLoading: false
    }
    case actionTypes.FETCH_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
    case actionTypes.FETCH_SUCCESS:
    return {
      ...state,
      isLoading: false,
    }
    default:
      return state
  }
}

export default utilReducer