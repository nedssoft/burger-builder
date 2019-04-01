import * as types from './types'

export const fetchFailed = () => {
  return {
    type: types.FETCH_FAILED
  }
}

export const fetchRequest = () => {
  return {
    type: types.FETCH_REQUEST
  }
}

export const fetchSuccess = () => {
  return {
    type: types.FETCH_SUCCESS
  }
}