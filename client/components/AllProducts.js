import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProductsThunk, deleteProductThunk} from '../store/product'
import {Link} from 'react-router-dom'
import NewProductForm from './NewProductForm'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    console.log('PROPS:', this.props)
    const {products} = this.props.products
    const productList = products.length ? (
      products.map(product => {
        return (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h4>{product.title}</h4>
            </Link>
            <p>{product.description}</p>
            <button
              type="button"
              onClick={() => this.props.deleteProduct(product.id)}
            >
              X
            </button>
          </div>
        )
      })
    ) : (
      <h4>No products to display</h4>
    )
    return (
      <div>
        <h4>Add a new product</h4>
        <div>
          <NewProductForm addProduct={this.addProduct} />
        </div>
        <hr />
        <div>{productList}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProductsThunk()),
  deleteProduct: productId => dispatch(deleteProductThunk(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
