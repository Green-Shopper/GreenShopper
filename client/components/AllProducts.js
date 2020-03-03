import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProductsThunk} from '../store/album'
// import {Link} from 'react-router-dom'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props
    const productList = products.length ? (
      products.map(product => {
        return (
          <div key={product.id}>
            <h4>{product.title}</h4>
          </div>
        )
      })
    ) : (
      <h4>No products to display</h4>
    )
    return <div>{productList}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProductsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)