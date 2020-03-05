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
      <div className="container container-padding">
        <div className="col s12 m7">
          <div className="card horizontal">
            <div className="card-image">
              <img
                src={product.imgUrl}
                className="img-resize"
                alt="Image of flower"
              />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <div className="row">
                  <div className="col s6 l6">
                    <h2 className="header">{product.title}</h2>
                  </div>
                  <div className="col s6 l6 blue-text text-darken-2">
                    <h5>${product.price}</h5>
                  </div>
                </div>
                <p>{product.description}</p>
              </div>
              <div className="card-action">
                <div className="input-field center">
                  <button
                    className="btn center"
                    type="button"
                    onClick={() => this.props.addToCart({id, quantity: 1})}
                  >
                    Add to Cart
                    <i className="material-icons right">shopping_cart</i>
                  </button>
                  {isAdmin ? (
                    <Link to={`/editproduct/${id}`} className="btn right">
                      Edit Product <i className="material-icons right">edit</i>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
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
