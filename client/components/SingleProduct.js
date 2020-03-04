import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/singleProduct'

export class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleProduct(id)
  }

  render() {
    console.log('SINGLE PRODUCT:', this.props)
    const {singleProduct} = this.props
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
  singleProduct: state.singleProduct
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
