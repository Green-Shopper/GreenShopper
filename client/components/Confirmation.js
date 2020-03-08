import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProductThunk} from '../store/products'
import {getAllCartItemsThunk} from '../store/cart'
import {Link} from 'react-router-dom'

export class Confirmation extends Component {
  componentDidMount() {
    this.props.getProductsInCart()
  }

  render() {
    console.log('PROPS', this.props)

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

export default connect(mapState, mapDispatchToProps)(Confrimation)
