import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'

export class ProductAdded extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const ids = this.props.products.map(product => product.id)
    const id = Math.max(...ids)
    return (
      <div className="main-header">
        <div className="showcase container">
          <div className="card-panel grey-text">
            <div className="center">
              <h4>
                Product Added!
                <Link to={`/products/${id}`}> Click here</Link> to view product.
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProductsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdded)
