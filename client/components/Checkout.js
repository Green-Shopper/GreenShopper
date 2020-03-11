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
    let subTotal = 0
    this.props.cart.forEach(function(item) {
      subTotal += item.price * item.quantity
    })

    return (
      <section className="products">
        <div className="row">
          <div className="center grey-text text-darken-2">
            <h1>Order Summary</h1>
          </div>
          <div className="col s12 l12">
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
                      <div className="col s12 l6 left">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        Qty: <b className="red-text">{item.quantity}</b>
                      </div>
                      <div className="col 12 l1 right blue-text">
                        <h5>
                          ${(item.price / 100).toFixed(2) * item.quantity}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="row right">
              <div className="col s12 l12">
                <div className="card">
                  <div className="card-content">
                    <h5>
                      Total:
                      <b className="red-text">${(subTotal / 100).toFixed(2)}</b>
                    </h5>
                  </div>
                  <div className="card-action center">
                    <Link
                      onClick={() => this.handleClick()}
                      className="btn waves-effect waves-light"
                      to="checkout/confirmation"
                    >
                      Buy Now
                    </Link>
                    <Link to="/products"> Keep Shopping</Link>
                  </div>
                </div>
              </div>
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
