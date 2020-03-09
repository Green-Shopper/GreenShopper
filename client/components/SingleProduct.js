import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/singleProduct'
import {
  addProductToCartThunk,
  removeProductFromCartThunk,
  updateProductQtyInCartThunk,
  getAllCartItemsThunk,
  gotAllCartItems
} from '../store/cart'
import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    console.log('this.props is: ', this.props)
    this.props.fetchSingleProduct(id)
    this.props.getAllCartItems()
  }

  addToCartNotification(productName, quantity) {
    const toastHTML = `
      <div>
        <p>Added to cart!</p>
        <p>Qty ${quantity}: ${productName}${
      quantity > 1 ? 's are' : ' is'
    } in your cart</p>
      </div>`
    M.toast({
      html: toastHTML
    })
  }

  chooseHandler(id, user, product, cart) {
    if (user.email) {
      this.addToUserCartHandler(id, cart, product)
    } else {
      this.addToGuestCartHandler(product)
    }
  }

  addToUserCartHandler(id, cart, product) {
    let itemInCart = []
    console.log('ITEM IN CART:', product)
    if (cart.length > 0) {
      //changed !== to ===
      console.log('LOGGING CART', cart)
      // itemInCart = cart.filter(cartItem => cartItem.id === id);
      for (let i = 0; i < cart.length; i++) {
        let cartElement = cart[i]
        if (cartElement.id === Number(id)) {
          itemInCart.push(cartElement)
        }
      }
    }
    if (itemInCart.length) {
      this.props.updateQuantity({
        id,
        quantity: itemInCart[0].quantity + 1
      })
      this.addToCartNotification(
        itemInCart[0].title,
        itemInCart[0].quantity + 1
      )
    } else {
      this.props.addToCart({id, quantity: 1, price: product.price})
      this.addToCartNotification(product.title, 1)
    }
  }

  addToGuestCartHandler(product) {
    const ls = window.localStorage
    const itemToAdd = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl
    }
    let guestCart = JSON.parse(ls.getItem('cart'))
    //if guestCart is undefined create an empty guestCart
    if (!guestCart) {
      guestCart = []
    }
    //cycle through items in cart and update quantity if
    //the item is already in the cart
    for (let i = 0; i < guestCart.length; i++) {
      //+'s are used for type coercion
      // const cartItem = JSON.parse(guestCart[i])
      if (+guestCart[i].id === +itemToAdd.id) {
        guestCart[i].quantity += 1
        this.props.setGuestCartInStore(guestCart)
        ls.setItem('cart', JSON.stringify(guestCart))
        this.addToCartNotification(itemToAdd.title, guestCart[i].quantity)
        return
      }
    }

    //adding a new product to the cart here
    const updatedCart = JSON.stringify([
      ...guestCart,
      {...itemToAdd, quantity: 1}
    ])
    ls.setItem('cart', updatedCart)
    this.props.setGuestCartInStore(JSON.parse(updatedCart))
    this.addToCartNotification(itemToAdd.title, 1)
  }

  clearGuestCart() {
    window.localStorage.removeItem('cart')
    console.log('cleared guest cart')
  }

  render() {
    const id = this.props.match.params.id
    const {singleProduct, isAdmin, cart, user} = this.props
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
                    onClick={() => this.chooseHandler(id, user, product, cart)}
                  >
                    Add to Cart
                    <i className="material-icons right">shopping_cart</i>
                  </button>
                  <button type="button" onClick={this.clearGuestCart}>
                    clearGuestCart
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
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProductThunk(id)),
  addToCart: productToAdd => dispatch(addProductToCartThunk(productToAdd)),
  removeFromCart: id => dispatch(removeProductFromCartThunk(id)),

  //updateInfo needs to be an object with productId and the new quantity to buy {productId, quantity}
  updateQuantity: updateInfo =>
    dispatch(updateProductQtyInCartThunk(updateInfo)),
  getAllCartItems: () => dispatch(getAllCartItemsThunk()),
  setGuestCartInStore: guestCart => dispatch(gotAllCartItems(guestCart))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
