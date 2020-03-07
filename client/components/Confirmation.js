import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProductThunk} from '../store/products'
import {getAllCartItemsThunk} from '../store/cart'
import {Link} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import {toast} from 'react-toastify'
import axios from 'axios'

export class ShoppingCart extends Component {
  componentDidMount() {
    this.props.getProductsInCart()
  }

  render() {
    console.log('PROPS', this.props)
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
        <h1>Thanks for your order {this.props.firstName}</h1>
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
                  </div>
                </div>
              </div>
            )
          })}
        </span>
        <div className="subtotalStyle">
          <h3>Total</h3>
          <h3>${subTotal}</h3>
        </div>
        <Link to="/products">Browse Products</Link>
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
    getProductsInCart: () => dispatch(getAllCartItemsThunk())
  }
}

export default connect(mapState, mapDispatchToProps)(ShoppingCart)
