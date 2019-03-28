import * as types from "../actions/types"

const initialState = {
  orders: [],
  purchased: false,
  isLoading: false,
  error: null
}
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
     case types.SET_ORDERS:
      return {
        ...state,
        orders: initialState.orders.concat(action.orders),
        isLoading: false, error: false
        
      }
      case types.PURCHASE_ORDER_INIT:
      return {
        ...state,
        isLoading: false, purchased: false
      }
      case types.PURCHASE_ORDER_START:
      return {
        ...state,
        isLoading: true, purchased: false
      }
      case types.PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false, purchased: true
      }
      case types.PURCHASE_ORDER_FAILED:
      return {
        ...state,
        isLoading: false, purchased: false
      }
      default:
        return state
  }
}

export default orderReducer