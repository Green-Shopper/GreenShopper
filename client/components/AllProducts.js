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
    const {products, isAdmin} = this.props
    return (
      <div>
        <section className="products">
          <div className="row">
            {/* product nav start */}
            <div className="col s12 l12">
              <div className="card grey-text text-darken-2">
                <div className="card-content center">
                  <span className="card-title center">Filter by Light</span>
                  <br />
                  <div className="row">
                    <div className="col s12 l4">
                      <Link to="/products">
                        <i className="fas fa-cloud" /> Low light
                      </Link>
                    </div>
                    <div className="col s12 l4">
                      <Link to="/products">
                        <i className="fas fa-adjust" /> Medium Light
                      </Link>
                    </div>
                    <div className="col s12 l4">
                      <Link to="/products">
                        <i className="fas fa-sun" /> High Light
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* product nav end */}

            <div className="col s12 l12">
              <div>
                <div className="row">
                  {products.map(product => {
                    return (
                      <div key={products.id} className="col s12 m6 l4">
                        <div className="card">
                          <div className="card-image">
                            <Link to={`/products/${product.id}`}>
                              <img
                                className="product-img"
                                src={`../../${product.imgUrl}`}
                              />
                            </Link>
                            {isAdmin ? (
                              <button
                                type="button"
                                onClick={() =>
                                  this.props.deleteProduct(product.id)
                                }
                                className="btn-floating halfway-fab waves-effect waves-light red"
                              >
                                <i className="material-icons">remove</i>
                              </button>
                            ) : (
                              ''
                            )}
                          </div>
                          <div className="card-content">
                            <div className="center">
                              <Link
                                to={`/products/${product.id}`}
                                className="black-text"
                              >
                                <h6>{product.title}</h6> <br />
                              </Link>
                              <p className="blue-text right">{`$${(
                                product.price / 100
                              ).toFixed(2)}`}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
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
