import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }
  componentDidMount() {
    const { location } = this.props
    const query = new URLSearchParams(location.search);
   
    const ingredients = {}
    let price = 0
    for (let param of query.entries()) {
     if (param[0] === 'price') {
       price = param[1]
     } else {
      ingredients[param[0]] = +param[1]
     }
    }
    this.setState({ingredients, price: price})

  }
  cancelCheckoutHandler = () => {
    const { history } = this.props;
    history.goBack();
  }
  continueCheckoutHandler = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  }

  render() {
    const { ingredients, price } = this.state;
    const { match} = this.props;
    let  checkoutSummary = <Spinner />

    if (ingredients) {
      checkoutSummary = (
        <Aux>
          <CheckoutSummary 
            ingredients={ingredients}
            cancelCheckout={this.cancelCheckoutHandler}
            continueCheckout={this.continueCheckoutHandler}
          />
        </Aux>
      )
    }
    return (
      <div>
        {checkoutSummary}
        <Route path={match.path + '/contact-data'} render={( props) => (<ContactData ingredients={ingredients} price={price} {...props} />)} />

      </div>
    )
  }
}

export default Checkout