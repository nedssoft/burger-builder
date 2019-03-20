import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuilControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

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
    isLoading: false,
  }
  componentDidMount() {
    axios.get('/ingredients.json')
    .then(res => {
      this.setState({ingredients: res.data});
    })
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
    this.setState({isLoading: true});

    const { ingredients, totalPrice } = this.state;
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: {
        name: 'chinedu',
        email: 'ned@gmail.com',
        phone: '07035052689'
      }
    }
    axios.post('/orders.json', order)
    .then(res => {
      if (res.data.name) {
        this.setState({showCheckout: false, isLoading: false});
        alert('order created successfully');
      }
    })
    .catch(err => {
      this.setState({ isLoading: false, showCheckout: false});

    });

  }
  render() {
    const { ingredients, totalPrice, showCheckout, showPrice, isLoading } = this.state;
    const disabledInfo = {...ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary 
        ingredients={ingredients} 
        cancel={this.closeModal} 
        price={totalPrice}
        checkout={showPrice}
        proceed={this.completePurchaseHandler}
      />
    );

    if (isLoading) {
      orderSummary = <Spinner />
    }

    let burger = <Spinner />
    if (ingredients) {
      burger = (
        <Aux>
          <BuilControls 
            ingredientAdded={this.addIngredient} 
            ingredientRemoved={this.removeIngredient} 
            totalPrice={totalPrice}
            disabled={disabledInfo}
            checkout={this.checkoutHandler}
          />
        </Aux>
      )
    }
    return (
      <Aux>
        <Modal show={showCheckout} closeModal={this.closeModal}>
          {orderSummary}
        </Modal>
        <Burger ingredients={ingredients} />
        { burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
