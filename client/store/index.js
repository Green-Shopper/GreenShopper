import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productsReducers from './products'
import singleProductReducer from './singleProduct'
import cart from './cart'
import userCartReducer from './singleUserCart'
import usersReducer from './allUsers'
import singleUserReducer from './singleUser'
import ordersReducer from './orderHistory'

const reducer = combineReducers({
  user: user,
  products: productsReducers,
  singleProduct: singleProductReducer,
  selectedUser: singleUserReducer,
  userCart: userCartReducer,
  cart: cart,
  users: usersReducer,
  orders: ordersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allUsers'
export * from './products'
export * from './singleProduct'
export * from './cart'
export * from './orderHistory'
