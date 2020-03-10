import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProductThunk} from '../store/products'
import {
  getAllCartItemsThunk,
  checkoutCartThunk,
  confirmationCartThunk,
  getNewCartThunk
} from '../store/cart'
import {Link} from 'react-router-dom'

// import StripeCheckout from 'react-stripe-checkout'
// import {toast} from 'react-toastify'
// import axios from 'axios'

export class Checkout extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getProductsInCart()
  }

  async handleClick() {
    // console.log(id)
    await this.props.updateCart()
    await this.props.assignNewCart()
  }

  render() {
    const cartId = this.props.user.cartId
    // console.log('PROPS', this.props.user.cartId)
    // Stripe implementation ========
    // toast.configure()
    // const handleToken = async token => {
    //   const response = await axios.post(
    //     'http://localhost:8080/shoppingcart/checkout',
    //     {
    //       token
    //     }
    //   )
    //   const {status} = response.data
    //   if (status === 'success') {
    //     toast('Success!, Check email for details', {type: 'success'})
    //   } else {
    //     toast('Something went wrong', {type: 'error'})
    //   }
    // }

    //Stripe implementation ========

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
    assignNewCart: () => dispatch(getNewCartThunk())
  }
}

export default connect(mapState, mapDispatchToProps)(Checkout)

//Buy now switch current cart to false
//Give user a new cart
