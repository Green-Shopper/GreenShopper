import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/singleProduct'
import {
  addProductToCartThunk,
  removeProductFromCartThunk,
  updateProductQtyInCart
} from '../store/cart'
import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    console.log('this.props is: ', this.props)
    this.props.fetchSingleProduct(id)
  }

  clickHandler(id, cart) {
    console.log('id, and cart are: ', id, cart)
    let itemInCart
    if (cart.length > 0) {
      itemInCart = cart.filter(cartItem => cartItem.id !== id)
    }
    console.log('In the cart now: ', cart)
    if (itemInCart) {
      console.log('itemInCart is: ', itemInCart[0].quantity)
      this.props.updateQuantity({
        id,
        quantity: itemInCart[0].quantity + 1
      })
    } else {
      this.props.addToCart({id, quantity: 1})
    }
  }

  render() {
    const id = this.props.match.params.id
    const {singleProduct, isAdmin, cart} = this.props
    const product = singleProduct ? singleProduct : {}
    return (
      <div className="container container-padding">
        <div className="col s12 m7">
          <div className="card horizontal">
            <div className="card-image">
              <img
                src={`../../${product.imgUrl}`}
                className="img-resize"
                alt="Image of flower"
              />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <div className="row">
                  <div className="col s6 l8 left">
                    <h2 className="header">{product.title}</h2>
                  </div>
                  <div className="col s6 l4 blue-text text-darken-2">
                    <h4>${(product.price / 100).toFixed(2)}</h4>
                  </div>
                </div>
                <p>{product.description}</p>
              </div>
              <div className="card-action">
                <div className="input-field center">
                  <button
                    className="btn waves-effect waves-light center"
                    type="button"
                    onClick={() => this.clickHandler(id, cart)}
                  >
                    Add to Cart
                    <i className="material-icons right">shopping_cart</i>
                  </button>

                  {isAdmin ? (
                    <Link
                      to={`/editproduct/${id}`}
                      className="btn waves-effect waves-light right yellow darken-2"
                    >
                      Edit Product <i className="material-icons right">edit</i>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.singleProduct,
  isAdmin: state.user.isAdmin,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProductThunk(id)),
  addToCart: id => dispatch(addProductToCartThunk(id)),
  removeFromCart: id => dispatch(removeProductFromCartThunk(id)),
  //updateInfo needs to be an object with productId and the new quantity to buy {productId, quantity}
  updateQuantity: updateInfo => dispatch(updateProductQtyInCart(updateInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
