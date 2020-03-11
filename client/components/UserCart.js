import React, {Component} from 'react'
import {fetchSingleUserThunk} from '../store/singleUser'
import {
  getCartByIdThunk,
  removeProductFromUserCartThunk,
  updateProductQtyInUserCartThunk
} from '../store/singleUserCart'
import {connect} from 'react-redux'

export class UserCart extends Component {
  constructor() {
    super()
    this.incrementFunction = this.incrementFunction.bind(this)
    this.decrementFunction = this.decrementFunction.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleUser(id)
    this.props.getCartById(id)
  }
  incrementFunction(item, cartId) {
    this.props.updateQuantity({
      id: item.id,
      quantity: item.quantity + 1,
      cartId
    })
  }
  decrementFunction(item, cartId) {
    this.props.updateQuantity({
      id: item.id,
      quantity: item.quantity - 1,
      cartId
    })
  }
  render() {
    let subTotal = 0
    this.props.userCart.forEach(item => {
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
            <h4>
              {this.props.selectedUser.firstName +
                ' ' +
                this.props.selectedUser.lastName +
                "'s Cart"}
            </h4>
            <br />
          </div>

          <div className="col s12 m9 l9">
            {this.props.userCart.map(item => {
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
                            this.props.removeProductFromCart(
                              item.id,
                              this.props.cartId
                            )
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
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    removeProductFromCart: (productId, cartId) =>
      dispatch(removeProductFromUserCartThunk(productId, cartId)),
    fetchSingleUser: id => dispatch(fetchSingleUserThunk(id)),
    getCartById: id => dispatch(getCartByIdThunk(id)),
    updateQuantity: item => dispatch(updateProductQtyInUserCartThunk(item))
  }
}
const mapStateToProps = function(state) {
  return {
    selectedUser: state.selectedUser,
    userCart: state.userCart,
    cartId: state.selectedUser.cartId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
