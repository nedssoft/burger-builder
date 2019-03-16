import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuilControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
  salad: 0.8,
  meat: 1,
  bacon: .45,
  cheese: .5
}
class BurgerBuilder extends Component {
  constructor() {
    super();
  }
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    },
    totalPrice: 4,
    showCheckout: false,
    showPrice: false,
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
  proceedHandler = () => {
    this.setState({showPrice: true});
  }
  render() {
    const { ingredients, totalPrice, showCheckout, showPrice } = this.state;
    const disabledInfo = {...ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={showCheckout} closeModal={this.closeModal}>
          <OrderSummary 
            ingredients={ingredients} 
            cancel={this.closeModal} 
            price={totalPrice}
            checkout={showPrice}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuilControls 
          ingredientAdded={this.addIngredient} 
          ingredientRemoved={this.removeIngredient} 
          totalPrice={totalPrice}
          disabled={disabledInfo}
          checkout={this.checkoutHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
