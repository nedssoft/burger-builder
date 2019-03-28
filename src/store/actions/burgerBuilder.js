import * as types from './types'
import axios from '../../axios-orders'


export const fetchIngredientsRequest = () => {
  return {
    type: types.FETCH_INGREDIENTS_REQUEST
  }
}
export const fetchIngredientsSuccess = () => {
  return {
    type: types.FETCH_INGREDIENTS_SUCCESS
  }
}
export const fetchIngredientsFailed = () => {
  return {
    type: types.FETCH_INGREDIENTS_FAILED
  }
}
export const addIngredient = (name) => {
  return {
    type: types.ADD_INGREDIENT, 
    ingredientName: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: types.REMOVE_INGREDIENT, 
    ingredientName: name
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: types.SET_INGREDIENTS,
    ingredients
  }
}

export const initIngredients = () => {
  return dispatch => {
    dispatch(fetchIngredientsRequest())
     axios.get('/ingredients.json')
    .then(res => {
      if (res.data) {
        dispatch(fetchIngredientsSuccess())
        dispatch(setIngredients(res.data));
      } else {
       dispatch(fetchIngredientsFailed())
      }
    })
    .catch(err => {
      dispatch(fetchIngredientsFailed())
    })
  }
}

