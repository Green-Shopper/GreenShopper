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
    let subTotal = 0
    this.props.cart.forEach(item => {
      if (item.quantity === 0) {
        this.props.removeProductFromCart(item.id, this.props.cartId)
      }
      subTotal += item.price * item.quantity
    })
    return (
      <section className="products">
        <div className="row">
          <div className="center grey-text text-darken-2">
            <h3>Shopping Cart</h3>
            {this.props.firstName ? (
              <h5>
                {this.props.firstName + ' ' + this.props.lastName + "'s Cart"}
              </h5>
            ) : (
              <h5>Guest Cart</h5>
            )}
            <Link to="/products">Continue Shopping</Link>
            <br />
          </div>
          <div className="col s12 m9 l9">
            {this.props.cart.map(item => {
              return (
                <div key={item.id} className="card horizontal">
                  <div className="card-image">
                    {`${item.imgUrl}`.startsWith('http') ? (
                      <img
                        src={item.imgUrl}
                        className="cart-img"
                        alt="Image of flower"
                      />
                    ) : (
                      <img
                        src={`../../${item.imgUrl}`}
                        className="cart-img"
                        alt="Image of flower"
                      />
                    )}
                  </div>
                  <div className="card-stacked">
                    <div className="card-content">
                      <div>
                        <div className="col s12 l6 left">
                          <h5>{item.title}</h5>
                          {item.description}
                        </div>
                        <p className="col s12 l1 right blue-text">
                          ${(item.price / 100).toFixed(2)}
                        </p>
                        <br />
                        <div className="row right">
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
                        </div>
                      </div>
                    </div>
                    <div className="card-action">
                      <div className="col s12 l6 right">
                        <button
                          className="btn-floating waves-effect waves-light red right"
                          type="button"
                          name="action"
                          onClick={() =>
                            this.removeHandler(item.id, this.props.cartId)
                          }
                        >
                          <i className="material-icons">remove</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="col s12 l3 center">
            <div className="card">
              <div className="card-content">
                <span className="card-title center center">Subtotal</span>
                <div>
                  <h4>${(subTotal / 100).toFixed(2)}</h4>
                </div>
              </div>
              {this.props.cart.length ? (
                <div className="card-action center">
                  <Link
                    to="/shoppingcart/checkout"
                    className="btn waves-effect waves-light"
                  >
                    Checkout <i className="material-icons right">loyalty</i>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
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
