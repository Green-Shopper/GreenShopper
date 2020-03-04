import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/product'
import {addProductToCartThunk} from '../store/cart'

export class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleProduct(id)
  }

  render() {
    const id = this.props.match.params.id
    const {singleProduct} = this.props.products
    const product = singleProduct ? singleProduct : {}
    return (
      <div>
        <h4>{product.title}</h4>
        <img src={product.imgUrl} alt="Image of flower" />
        <h5>{product.price}</h5>
        <p>{product.description}</p>
        <button
          type="button"
          onClick={() => this.props.addToCart({id, quantity: 1})}
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProductThunk(id)),
  addToCart: id => dispatch(addProductToCartThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
