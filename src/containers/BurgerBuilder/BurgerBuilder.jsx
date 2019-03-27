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
import * as actionTypes from '../../store/actions'

const INGREDIENT_PRICE = {
  salad: 0.8,
  meat: 1,
  bacon: .45,
  cheese: .5
}
class BurgerBuilder extends Component {
  // constructor() {
  //   super();
  // }
  state = {
    showCheckout: false,
    showPrice: false,
    isLoading: false,
  }
  componentDidMount() {
    // axios.get('/ingredients.json')
    // .then(res => {
    //   this.setState({ingredients: res.data});
    // })
    // .catch(err => console.log(err))
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
   
    const { history } = this.props;
  
    history.push('/checkout')
    
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
    const { showCheckout, showPrice, isLoading } = this.state;
    const { ingredients, price, onIngredientAdded, onIngredientRemoved } = this.props
    const disabledInfo = {...ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    let orderSummary;
    let burger = <Spinner />
    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuilControls 
            ingredientAdded={onIngredientAdded} 
            ingredientRemoved={onIngredientRemoved} 
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
    if (isLoading) {
      orderSummary = <Spinner />
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
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: igName}),
    onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
