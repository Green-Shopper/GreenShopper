import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProductsThunk, deleteProductThunk} from '../store/products'
import {Link} from 'react-router-dom'
import NewProductForm from './NewProductForm'
import me from '../store/user'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    // console.log('PROPS:', this.props)
    // console.log('isAdmin?:', this.props.isAdmin)
    const {isAdmin} = this.props
    const {products} = this.props
    const productList = products.length ? (
      products.map(product => {
        return (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h4>{product.title}</h4>
            </Link>

            <p>{product.description}</p>
            {isAdmin ? (
              <button
                type="button"
                onClick={() => this.props.deleteProduct(product.id)}
              >
                X
              </button>
            ) : (
              ''
            )}
          </div>
        )
      })
    ) : (
      <h4>No products to display</h4>
    )
    return (
      <div>
        {isAdmin ? (
          <div>
            <h4>Add a new product</h4>
            <div>
              <NewProductForm addProduct={this.addProduct} />
            </div>
          </div>
        ) : (
          ''
        )}

        <hr />
        <div>{productList}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  isAdmin: state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProductsThunk()),
  deleteProduct: productId => dispatch(deleteProductThunk(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
