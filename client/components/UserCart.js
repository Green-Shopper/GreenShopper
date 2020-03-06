import React, {Component} from 'react'
import {deleteProductThunk} from '../store/products'
import {fetchSingleUserThunk} from '../store/singleUser'
import {getCartByIdThunk} from '../store/singleUserCart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class UserCart extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    console.log('loggingIdInMount', id)
    this.props.fetchSingleUser(id)
    this.props.getCartById(id)
  }
  render() {
    const id = this.props.match.params.id
    let subTotal = 0
    this.props.userCart.forEach(function(item) {
      subTotal += item.price
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
          {this.props.userCart.map(function(item) {
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
                      <span>-</span>1<span>+</span>
                    </p>
                    <div>
                      Remove
                      <button type="button" className="shoppingRemove">
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

const mapDispatchToProps = function(dispatch) {
  return {
    deleteProducts: () => dispatch(deleteProductThunk()),
    fetchSingleUser: id => dispatch(fetchSingleUserThunk(id)),
    getCartById: id => dispatch(getCartByIdThunk(id))
  }
}
const mapStateToProps = function(state) {
  return {
    selectedUser: state.selectedUser,
    userCart: state.userCart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
