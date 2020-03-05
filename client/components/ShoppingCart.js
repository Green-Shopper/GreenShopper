import React from 'react'
import {connect} from 'react-redux'
import {deleteProductThunk} from '../store/products'
import {Link} from 'react-router-dom'

export const ShoppingCart = function(props) {
  console.log('logging cart Props', props)
  let subTotal = 0
  props.itemsInCart.forEach(function(item) {
    subTotal += item.price
  })
  return (
    <div className="shoppingComponent">
      <h1>Shopping Cart</h1>
      <Link to="/products">Continue Shopping</Link>
      <h3>{props.firstName + ' ' + props.lastName + "'s Cart"}</h3>
      <span>
        {props.itemsInCart.map(function(item) {
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
                    <span className="spanStyle">-</span>1<span className="spanStyle">
                      +
                    </span>
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
          <Link>Checkout</Link>
        </button>
      </pre>
    </div>
  )
}

const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: () => dispatch(deleteProductThunk())
  }
}

export default connect(mapState, mapDispatchToProps)(ShoppingCart)
