import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

class Checkout extends Component {
  state = {
    ingredients: null
  }
  componentDidMount() {
    const { location } = this.props
    const query = new URLSearchParams(location.search);
   
    const ingredients = {}

    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients})

  }
  cancelCheckoutHandler = () => {
    const { history } = this.props;
    history.goBack();
  }
  continueCheckoutHandler = () => {
    const { history } = this.props;
    history.replace('/checkout-contact');
  }

  render() {
    const { ingredients } = this.state;
    let  checkoutSummary = <Spinner />

    if (ingredients) {
      checkoutSummary = (
        <CheckoutSummary 
          ingredients={ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
      )
    }
    return (
      <div>
        {checkoutSummary}
      </div>
    )
  }
}

export default Checkout