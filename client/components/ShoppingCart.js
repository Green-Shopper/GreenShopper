import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getAllCartItemsThunk,
  removeProductFromCartThunk,
  updateProductQtyInCartThunk
} from '../store/cart'
import {Link} from 'react-router-dom'

export class ShoppingCart extends Component {
  constructor() {
    super()
    this.incrementFunction = this.incrementFunction.bind(this)
    this.decrementFunction = this.decrementFunction.bind(this)
  }

  componentDidMount() {
    this.props.getProductsInCart()
  }
  incrementFunction(item, cartId) {
    this.props.updateQuantity({
      id: item.id,
      quantity: item.quantity + 1,
      cartId
    })
  }
  decrementFunction(item, cartId) {
    this.props.updateQuantity({
      id: item.id,
      quantity: item.quantity - 1,
      cartId
    })
  }
  render() {
    let subTotal = 0
    this.props.cart.forEach(item => {
      if (item.quantity === 0) {
        this.props.removeProductFromCart(item.id, this.props.cartId)
      }
      subTotal += item.price * item.quantity
    })
    return (
      <div className="shoppingComponent">
        <h1>Shopping Cart</h1>
        <Link to="/products">Continue Shopping</Link>
        <h3>{this.props.firstName + ' ' + this.props.lastName + "'s Cart"}</h3>
        <span>
          {this.props.cart.map(item => {
            return (
              <div key={item.id}>
                <div className="cartProducts">
                  <img src={item.imgUrl} className="tempPic" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Description: {item.description}</p>
                    <h5>${(item.price / 100).toFixed(2)}</h5>
                    <pre />
                    <p className="qty">
                      <span
                        className="spanStyle"
                        onClick={() =>
                          this.decrementFunction(item, this.props.cartId)
                        }
                      >
                        -
                      </span>
                      {item.quantity}
                      <span
                        className="spanStyle"
                        onClick={() =>
                          this.incrementFunction(item, this.props.cartId)
                        }
                      >
                        +
                      </span>
                    </p>

                    <div>
                      Remove
                      <button
                        type="button"
                        className="shoppingRemove"
                        onClick={() =>
                          this.props.removeProductFromCart(
                            item.id,
                            this.props.cartId
                          )
                        }
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
          <h3>${(subTotal / 100).toFixed(2)}</h3>
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
    lastName: state.user.lastName,
    cartId: state.user.cartId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProductsInCart: () => dispatch(getAllCartItemsThunk()),
    removeProductFromCart: (productId, cartId) =>
      dispatch(removeProductFromCartThunk(productId, cartId)),
    updateQuantity: item => dispatch(updateProductQtyInCartThunk(item))
  }
}

export default connect(mapState, mapDispatchToProps)(ShoppingCart)
