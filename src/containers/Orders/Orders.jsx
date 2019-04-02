import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import Order from '../../components/Order/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'
import { fetchOrders } from '../../store/actions/index'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

class Orders extends Component {
 
  componentDidMount() {
    this.props.fetchOrders(this.props.token || localStorage.getItem('token'))
  }
  
  render() {
    const fetchedOrders = this.props.isLoading ? <Spinner /> : (
      <Aux>
        { this.props.orders.map(order => {
          return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        }) }
      </Aux>
    )
    return (
      <div>
        { fetchedOrders }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    error: state.orderReducer.error,
    isLoading: state.orderReducer.isLoading,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  }
}
export default connect(mapStateToProps, { fetchOrders })(withErrorHandler(Orders, axios));