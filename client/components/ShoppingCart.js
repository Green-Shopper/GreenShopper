import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getAllCartItemsThunk,
  gotAllCartItems,
  removeProductFromCartThunk,
  updateProductQtyInCartThunk,
  updatedProductQtyInCart
} from '../store/cart'
import {Link} from 'react-router-dom'

export class ShoppingCart extends Component {
  constructor() {
    super()
    this.incrementFunction = this.incrementFunction.bind(this)
    this.decrementFunction = this.decrementFunction.bind(this)
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts() {
    const guestCart = JSON.parse(localStorage.getItem('cart'))
    if (this.props.cartId) {
      console.log('cartId was found')
      this.props.getProductsInCart()
    } else if (guestCart) {
      this.props.setGuestCartInStore(guestCart)
    }
  }

  incrementFunction(item, cartId) {
    if (cartId) {
      this.props.updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
        cartId
      })
    } else {
      const ls = window.localStorage
      const guestCart = JSON.parse(ls.getItem('cart'))
      const updatedCart = guestCart.map(cartItem => {
        if (cartItem.id === item.id) {
          cartItem.quantity += 1
        }
        this.props.updateGuestQuantity(cartItem)
        return cartItem
      })
      ls.setItem('cart', JSON.stringify(updatedCart))
    }
  }
  decrementFunction(item, cartId) {
    if (cartId) {
      this.props.updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
        cartId
      })
    } else {
      const ls = window.localStorage
      const guestCart = JSON.parse(ls.getItem('cart'))
      let updatedCart = []
      for (let i = 0; i < guestCart.length; i++) {
        if (guestCart[i].id === item.id) {
          guestCart[i].quantity -= 1
        }
        if (guestCart[i].quantity > 0) {
          updatedCart.push(guestCart[i])
          this.props.updateGuestQuantity(guestCart[i])
        }
      }
      this.props.setGuestCartInStore(updatedCart)
      ls.setItem('cart', JSON.stringify(updatedCart))
    }
  }
  removeHandler(itemId, cartId) {
    if (cartId) {
      this.props.removeProductFromCart(itemId, cartId)
    } else {
      const ls = window.localStorage
      const guestCart = JSON.parse(ls.getItem('cart'))
      const filteredCart = guestCart.filter(item => {
        if (item.id !== itemId) {
          return item
        }
      })
      ls.setItem('cart', JSON.stringify(filteredCart))
      this.props.setGuestCartInStore(filteredCart)
    }
  }
  render() {
    console.log('SHOPPING CART PROPS', this.props)
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
        {this.props.firstName ? (
          <h3>
            {this.props.firstName + ' ' + this.props.lastName + "'s Cart"}
          </h3>
        ) : (
          <h3>Guest Cart</h3>
        )}

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
                          this.removeHandler(item.id, this.props.cartId)
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
    updateQuantity: item => dispatch(updateProductQtyInCartThunk(item)),
    updateGuestQuantity: item => dispatch(updatedProductQtyInCart(item)),
    setGuestCartInStore: guestCart => dispatch(gotAllCartItems(guestCart))
  }
}

export default connect(mapState, mapDispatchToProps)(ShoppingCart)
