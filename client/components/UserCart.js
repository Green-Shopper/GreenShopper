import React, {Component} from 'react'
import {fetchSingleUserThunk} from '../store/singleUser'
import {
  getCartByIdThunk,
  removeProductFromUserCartThunk,
  updateProductQtyInUserCartThunk
} from '../store/singleUserCart'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class UserCart extends Component {
  constructor() {
    super()
    this.incrementFunction = this.incrementFunction.bind(this)
    this.decrementFunction = this.decrementFunction.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleUser(id)
    this.props.getCartById(id)
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
    this.props.userCart.forEach(item => {
      if (item.quantity === 0) {
        this.props.removeProductFromCart(item.id, this.props.cartId)
      }
      subTotal += item.price * item.quantity
    })
    console.log('logging Props in USERCART', this.props)
    return (
      <div className="shoppingComponent">
        <h1>Shopping Cart</h1>
        <h3>
          {this.props.selectedUser.firstName +
            ' ' +
            this.props.selectedUser.lastName +
            "'s Cart"}
        </h3>
        <span>
          {this.props.userCart.map(item => {
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

const mapDispatchToProps = function(dispatch) {
  return {
    removeProductFromCart: (productId, cartId) =>
      dispatch(removeProductFromUserCartThunk(productId, cartId)),
    fetchSingleUser: id => dispatch(fetchSingleUserThunk(id)),
    getCartById: id => dispatch(getCartByIdThunk(id)),
    updateQuantity: item => dispatch(updateProductQtyInUserCartThunk(item))
  }
}
const mapStateToProps = function(state) {
  return {
    selectedUser: state.selectedUser,
    userCart: state.userCart,
    cartId: state.selectedUser.cartId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
