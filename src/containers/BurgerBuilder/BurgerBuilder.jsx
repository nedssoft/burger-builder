import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuilControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import { addIngredient, removeIngredient, initIngredients, purchaseInit} from '../../store/actions/'

const INGREDIENT_PRICE = {
  salad: 0.8,
  meat: 1,
  bacon: .45,
  cheese: .5
}
class BurgerBuilder extends Component {

  state = {
    showCheckout: false,
    showPrice: false,
  }
  componentDidMount( ) {
    this.props.initIngredients()
  }
  addIngredient = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {...ingredients};
    updatedIngredient[type] = updatedCount;
    const oldPrice = totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICE[type];
    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
  }
  removeIngredient = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredient = {...ingredients};
      updatedIngredient[type] = updatedCount;
      const oldPrice = totalPrice;
      const newPrice = oldPrice - INGREDIENT_PRICE[type];
      this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    }
  }
  checkoutHandler = () => {
    const { showCheckout } = this.state;
    this.setState({showCheckout: !showCheckout});
  }
  closeModal = () => {
    this.setState({showCheckout: false})
  }
  completePurchaseHandler = () => {
   
    this.props.purchaseInit()
    this.props.history.push('/checkout')
    
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    })
    .reduce((sum, el) =>{
     return sum + el
    }, 0);
   

    return sum > 0;
  }
  render() {
    const { showCheckout, showPrice} = this.state;
    const { ingredients, price} = this.props
    const disabledInfo = {...ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    let orderSummary;
    let burger = this.props.error ? <p>Ingredients can not be loaded</p> : ''
    if (this.props.isLoading) {
      burger =  <Spinner />
    }
    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuilControls 
            ingredientAdded={this.props.addIngredient} 
            ingredientRemoved={this.props.removeIngredient} 
            disabled={disabledInfo}
            totalPrice={price}
            checkout={this.checkoutHandler}
            purchasable={this.updatePurchaseState(ingredients)}
          />
        </Aux>
      ),
      orderSummary = (
        <OrderSummary 
          ingredients={ingredients} 
          cancel={this.closeModal} 
          checkout={showPrice}
          price={price}
          proceed={this.completePurchaseHandler}
        />
      );
    }
  
    return (
      <Aux>
        <Modal show={showCheckout} closeModal={this.closeModal}>
          {orderSummary}
        </Modal>
        { burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error,
    isLoading: state.burgerBuilderReducer.isLoading,
    purchased: state.orderReducer.isLoading
  }
}

export default connect(
  mapStateToProps, 
  { addIngredient, removeIngredient, initIngredients, purchaseInit}
)(withErrorHandler(BurgerBuilder, axios));
