import React, { Component } from 'react'
import {connect} from 'react-redux';
import Order from '../../components/Order/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'
import { fetchOrders } from '../../store/actions/index'

class Orders extends Component {
 
  componentDidMount() {
   
    this.props.fetchOrders()
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
    isLoading: state.orderReducer.isLoading
  }
}
export default connect(mapStateToProps, { fetchOrders })(Orders);