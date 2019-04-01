import React from 'react'
import classes from './BuildControls.css'
import BuildControl from '../BuildControl/BuildControl'

const BuildControls = ( props ) => {
  const { ingredientAdded, ingredientRemoved, totalPrice, disabled, checkout, purchasable } = props;
  const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    
  ]
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price:
        {' $'}
        {totalPrice.toFixed(2)}
      </p>
      { controls.map(ctrl => (
        <BuildControl 
          key={ctrl.label} 
          label={ctrl.label} 
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      ))}
      <button 
        type="button"
        className={classes.OrderButton}
        onClick={checkout}
        disabled={!purchasable}
      >
        ORDER NOW
      </button>
    </div>
  )
}

export default BuildControls
