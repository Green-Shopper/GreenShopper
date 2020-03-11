import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProductThunk} from '../store/products'
import {
  getAllCartItemsThunk,
  checkoutCartThunk,
  getNewCartThunk,
  gotAllCartItems
} from '../store/cart'
import {Link} from 'react-router-dom'

export class Checkout extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
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

  async handleClick() {
    await this.props.updateCart()
    await this.props.assignNewCart()
    await window.localStorage.removeItem('cart')
    await this.props.setGuestCartInStore([])
  }

  render() {
    // const cartId = this.props.user.cartId
    console.log('CHECKOUT PROPS', this.props)

    let subTotal = 0
    this.props.cart.forEach(function(item) {
      subTotal += item.price * item.quantity
    })

    return (
      <div className="shoppingComponent">
        <h1>Order Summary</h1>
        <span>
          {this.props.cart.map(function(item) {
            return (
              <div key={item.id}>
                <div className="cartProducts">
                  <img src={item.imgUrl} className="tempPic" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Description: {item.description}</p>
                    <p>Qty: {item.quantity}</p>
                    <h5>${(item.price / 100).toFixed(2) * item.quantity}</h5>

                    <pre />
                  </div>
                </div>
              </div>
            )
          })}
        </span>
        <div className="subtotalStyle">
          <h3>Total</h3>
          <h3>${(subTotal / 100).toFixed(2)}</h3>
        </div>
        <div>
          <Link onClick={() => this.handleClick()} to="checkout/confirmation">
            Buy Now
          </Link>
        </div>
        <div>
          <Link to="/products">Keep Shopping</Link>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    order: state.order,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: () => dispatch(deleteProductThunk()),
    getProductsInCart: () => dispatch(getAllCartItemsThunk()),
    updateCart: () => dispatch(checkoutCartThunk()),
    assignNewCart: () => dispatch(getNewCartThunk()),
    setGuestCartInStore: guestCart => dispatch(gotAllCartItems(guestCart))
  }
}

export default connect(mapState, mapDispatchToProps)(Checkout)
