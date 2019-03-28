import * as actionTypes from '../actions/types'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  isLoading: false,
  error: null,
}
const INGREDIENT_PRICE = {
  salad: 0.8,
  meat: 1,
  bacon: .45,
  cheese: .5
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice+ INGREDIENT_PRICE[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    }
    
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients, error:false, totalPrice: 4
      }
      case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true, isLoading: false
      }
      case actionTypes.FETCH_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
      case actionTypes.FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    
    default: 
      return state;
  }
}

export default reducer;