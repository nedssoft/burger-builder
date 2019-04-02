import { combineReducers } from 'redux'

import utilReducer from './utilReducer'
import orderReducer from './orders'
import burgerBuilderReducer from './burgerBuilder'
import authReducer from './auth'


const reducers = combineReducers({
  utilReducer,
  orderReducer,
  burgerBuilderReducer,
  authReducer
});

export default reducers
