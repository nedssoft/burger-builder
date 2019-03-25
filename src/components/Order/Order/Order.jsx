import React from 'react'
import styles from './Order.css'

function Order({ingredients, price}) {
  const ingredientArr = []
  for (let ingName in ingredients) {
    ingredientArr.push({ amount: ingredients[ingName], name: ingName})
  }
  const ingredientOutput = ingredientArr.map(ig => {
    return (<span key={ig.name} className={styles.Ingredients}>{ig.name}({ig.amount})</span>)
  })
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price:<strong>USD {price}</strong></p>
    </div>
  )
}

export default Order
