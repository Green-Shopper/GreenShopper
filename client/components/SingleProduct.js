import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/product'

export class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleProduct(id)
  }

  render() {
    const {products} = this.props
    const product = products ? products : {}
    return (
      <div>
        <h4>{product.title}</h4>
        <h5>{product.price}</h5>
        <p>{product.description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = {
  fetchProducts: id => dispatchEvent(getSingleProductThunk(id))
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
