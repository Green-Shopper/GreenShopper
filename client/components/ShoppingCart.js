import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProductThunk} from '../store/products'
import {getAllCartItemsThunk} from '../store/cart'
import {Link} from 'react-router-dom'

const incrementFunction = function() {
  console.log('qty incremented!')
}
const decrementFunction = function() {
  console.log('qty decremented')
}
const removeFunction = function() {
  console.log('removedItem!')
}

export class ShoppingCart extends Component {
  componentDidMount() {
    this.props.getProductsInCart()
  }
  render() {
    console.log('logging cart Props', this.props)
    let subTotal = 0
    this.props.cart.forEach(function(item) {
      subTotal += item.price
    })
    return (
      <div className="shoppingComponent">
        <h1>Shopping Cart</h1>
        <Link to="/products">Continue Shopping</Link>
        <h3>{this.props.firstName + ' ' + this.props.lastName + "'s Cart"}</h3>
        <span>
          {this.props.cart.map(function(item) {
            return (
              <div key={item.id}>
                <div className="cartProducts">
                  <img src={item.imgUrl} className="tempPic" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Description: {item.description}</p>
                    <h5>${item.price}</h5>
                    <pre />
                    <p className="qty">
                      <span className="spanStyle" onClick={decrementFunction}>
                        -
                      </span>
                      1
                      <span className="spanStyle" onClick={incrementFunction}>
                        +
                      </span>
                    </p>

                    <div>
                      Remove
                      <button
                        type="button"
                        className="shoppingRemove"
                        onClick={removeFunction}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </span>
        <div className="subtotalStyle">
          <h3>Subtotal</h3>
          <h3>${subTotal}</h3>
        </div>
        <pre>
          <button type="submit">
            <Link to="/shoppingcart/checkout">Checkout</Link>
          </button>
        </pre>
      </div>
    )
  }
}

const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: () => dispatch(deleteProductThunk()),
    getProductsInCart: () => dispatch(getAllCartItemsThunk())
  }
}

export default connect(mapState, mapDispatchToProps)(ShoppingCart)
