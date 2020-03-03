import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/product'

export class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleProduct(id)
  }

  render() {
    const {singleProduct} = this.props.products
    const product = singleProduct ? singleProduct : {}
    return (
      <div>
        <h4>{product.title}</h4>
        <img src={product.imgUrl} alt="Image of flower" />
        <h5>Price: ${product.price}</h5>
        <p>{product.description}</p>
        <button type="submit">Add to Cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
