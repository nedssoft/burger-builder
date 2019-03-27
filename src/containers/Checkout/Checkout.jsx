import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
 
  cancelCheckoutHandler = () => {
    const { history } = this.props;
    history.goBack();
  }
  continueCheckoutHandler = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  }

  render() {
    const { ingredients } = this.props;
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
        <Route path={match.path + '/contact-data'} component={ContactData} />

      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}
export default connect(mapStateToProps)(Checkout)