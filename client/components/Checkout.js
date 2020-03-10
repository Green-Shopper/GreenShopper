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
    this.props.getProductsInCart()
  }

  async handleClick() {
    await this.props.updateCart()
    await this.props.assignNewCart()
    await window.localStorage.removeItem('cart')
    this.props.setGuestCartInStore([])
  }

  render() {
    const cartId = this.props.user.cartId

    let subTotal = 0
    this.props.cart.forEach(function(item) {
      subTotal += item.price
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
                    <h5>${(item.price / 100).toFixed(2)}</h5>

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

//Buy now switch current cart to false
//Give user a new cart
