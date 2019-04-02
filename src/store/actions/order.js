import * as types from './types'
import axios from '../../axios-orders'

export const purchaseOrderStart = () => {
  return {
    type: types.PURCHASE_ORDER_START
  }
}
export const purchaseOrderFailed = () => {
  return {
    type: types.PURCHASE_ORDER_FAILED
  }
}

export const purchaseOrderSuccess = () => {
  return {
    type: types.PURCHASE_ORDER_SUCCESS
  }
}
export const setOrders = (orders) => {
  return {
    type: types.SET_ORDERS,
    orders: orders,
  }
}
export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(purchaseOrderStart())
    axios.get('/orders.json?auth='+ token)
    .then(res => {
      if (res.data) {
      dispatch(purchaseOrderSuccess())
        const orders = res.data
        const fetchedOrders = [];
        for (let key in orders) {
          fetchedOrders.push({
            ...orders[key],
            id: key
          })
      }
      dispatch(setOrders(fetchedOrders))
    }
    })
    .catch( err => {
      dispatch(purchaseOrderFailed())
    })
  }
  
}

export const createOrder = (orderData, token) => {

  return dispatch => {
    dispatch(purchaseOrderStart())
    axios.post('/orders.json?auth='+ token, orderData)
    .then(res => {
      if (res.data.name) {
        dispatch(purchaseOrderSuccess())
      dispatch(setOrders({...orderData, id: res.data.name}))
    }
    })
    .catch( err => {
      dispatch(purchaseOrderFailed())
    })
  }
  
}

export const purchaseInit = () => {
  return {
    type: types.PURCHASE_ORDER_INIT
  }
}




  
  