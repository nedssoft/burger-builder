import React, { Component } from 'react'
import Order from '../../components/Order/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'

class Orders extends Component {
  state = {
    orders: [],
    isLoading: false,
  }

  componentDidMount() {
    this.setState({isLoading: true})
    axios.get('/orders.json')
    .then(res => {
      if (res.data) {
        this.extractOrders(res.data);

      }
    })
    .catch( err => {
      this.setState({isLoading: false})
    })
  }
  extractOrders = (orders) => {
    const fetchedOrders = [];
    for (let key in orders) {
      fetchedOrders.push({
        ...orders[key],
        id: key
      })
    }

    this.setState({orders: fetchedOrders, isLoading:false});
  }
  
  render() {
    const { isLoading, orders } = this.state
    
    const fetchedOrders = isLoading ? <Spinner /> : (
      <Aux>
        { orders.map(order => {
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

export default Orders;