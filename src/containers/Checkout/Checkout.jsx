import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'
import ContactData from './ContactData/ContactData'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'


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
    let  checkoutSummary = <Redirect to="/" />

    if (ingredients) {
      const orderPurchased = this.props.purchased ? <Redirect to="/" /> : null
      checkoutSummary = (
        <Aux>
          { orderPurchased}
          <CheckoutSummary 
            ingredients={ingredients}
            cancelCheckout={this.cancelCheckoutHandler}
            continueCheckout={this.continueCheckoutHandler}
          />
          <Route path={match.path + '/contact-data'} component={ContactData} />
        </Aux>
      )
    }
    return (
      <div>
        {checkoutSummary}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    purchased: state.orderReducer.purchased
  }
}
export default connect(mapStateToProps)(withErrorHandler(Checkout, axios))