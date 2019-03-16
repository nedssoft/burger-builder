import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ( props  ) => {
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients).map((igKey) => {
    return [...Array(ingredients[igKey])].map((_, i) =>{
      return  <BurgerIngredient key={igKey + i} type={igKey} />
    });
  })
  .reduce((arr, el) => {
    return arr.concat(el);
  }, []); 

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      { transformedIngredients}      
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default Burger
