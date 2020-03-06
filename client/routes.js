import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllProducts from './components/AllProducts'
import {AllUsers} from './components/AllUsers'
import SingleProduct from './components/SingleProduct'
import ShoppingCart from './components/ShoppingCart'
import UserCart from './components/UserCart'
import {fetchUsersThunk} from './store/allUsers'
import {getAllCartItemsThunk} from './store/cart'
import EditProduct from './components/EditProduct'
import Checkout from './components/Checkout'
import {NewProductForm} from './components/NewProductForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchUsers()
    this.props.getProductsInCart()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log('logging props in routes', this.props)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/shoppingcart/checkout" component={Checkout} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/user" component={UserHome} />
            {/* <Route path="/home" component={UserHome} /> */}
            <Route path="/editproduct/:id" component={EditProduct} />
            <Route path="/addproduct/" component={NewProductForm} />
            <Route
              exact
              path="/users"
              render={props => <AllUsers {...props} users={this.props.users} />}
            />
            <Route
              exact
              path="/shoppingcart"
              render={props => (
                <ShoppingCart {...props} cart={this.props.cart} />
              )}
            />
            <Route
              exact
              path="/userCart/:id"
              render={props => <UserCart {...props} cart={this.props.cart} />}
            />
            <Route component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    users: state.users,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchUsers: () => dispatch(fetchUsersThunk()),
    getProductsInCart: () => dispatch(getAllCartItemsThunk())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
