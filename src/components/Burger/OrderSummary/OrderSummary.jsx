import React from 'react'
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
  const { ingredients, cancel,  price } = props;
  const orderSummary = Object.keys(ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>
        {': '}
        {ingredients[igKey]}
      </li>
)
  });
    
     
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with the follwoing ingredients</p>
      <ul>
        { orderSummary }
      </ul>
      <p>
      Total Price:
        {' '}
        <span style={{fontWeight: 'bold'}}>
         $
          {price}
        </span>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={cancel}>CANCEL</Button>
      <Button btnType="Success" clicked={cancel}>CONTINUE</Button>
    </Aux>
  )
}

export default OrderSummary
