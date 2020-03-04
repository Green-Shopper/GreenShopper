import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/singleProduct'
import {addProductToCartThunk} from '../store/cart'
import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleProduct(id)
  }

  render() {
    const id = this.props.match.params.id
    const {singleProduct, isAdmin} = this.props
    const product = singleProduct ? singleProduct : {}
    return (
      <div>
        <h4>{product.title}</h4>
        <img src={product.imgUrl} alt="Image of flower" />
        <h5>Price: ${product.price}</h5>
        <p>{product.description}</p>
        <button
          type="button"
          onClick={() => this.props.addToCart({id, quantity: 1})}
        >
          Add to Cart
        </button>
        {isAdmin ? <Link to={`/editproduct/${id}`}>Edit Product</Link> : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.singleProduct,
  isAdmin: state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProductThunk(id)),
  addToCart: id => dispatch(addProductToCartThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
