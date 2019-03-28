import { combineReducers } from 'redux'

import utilReducer from './utilReducer'
import orderReducer from './orders'
import burgerBuilderReducer from './burgerBuilder'


const reducers = combineReducers({
  utilReducer,
  orderReducer,
  burgerBuilderReducer
});

export default reducers
