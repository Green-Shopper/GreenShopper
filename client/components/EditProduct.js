import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editProductThunk, fetchSingleProductThunk} from '../store/singleProduct'

export class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: '',
      imgUrl: '',
      stock: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.fetchSingleProduct(id)
    this.setState({
      title: `${this.props.singleProduct.title}`,
      description: `${this.props.singleProduct.description}`,
      price: `${this.props.singleProduct.price}`,
      imgUrl: `${this.props.singleProduct.imgUrl}`,
      stock: `${this.props.singleProduct.stock}`
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    const id = this.props.match.params.id
    event.preventDefault()
    this.props.editProduct(this.props.match.params.id, this.state)
    this.props.history.push(`/products/${id}`)
  }

  render() {
    return (
      <div className="container container-padding">
        <div className="col s12 m7">
          <div className="card horizontal">
            <div className="card-image">
              {`${this.props.singleProduct.imgUrl}`.startsWith('http') ? (
                <img
                  src={this.props.singleProduct.imgUrl}
                  className="img-resize"
                  alt="Image of flower"
                />
              ) : (
                <img
                  src={`../../${this.props.singleProduct.imgUrl}`}
                  className="img-resize"
                  alt="Image of flower"
                />
              )}
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Title:
                    <input
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </label>

                  <label>
                    Description:
                    <input
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                    />
                  </label>

                  <label>
                    Price (in pennies):
                    <input
                      type="text"
                      name="price"
                      onChange={this.handleChange}
                      value={this.state.price}
                    />
                  </label>

                  <label>
                    Image URL:
                    <input
                      type="text"
                      name="imgUrl"
                      onChange={this.handleChange}
                      value={this.state.imgUrl}
                    />
                  </label>

                  <label>
                    Stock:
                    <input
                      type="text"
                      name="stock"
                      onChange={this.handleChange}
                      value={this.state.stock}
                    />
                  </label>
                  <div className="input-field center">
                    <button
                      className="btn waves-effect waves-light yellow darken-2"
                      type="submit"
                    >
                      Edit Product <i className="material-icons right">edit</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.singleProduct
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProductThunk(id)),
  editProduct: (id, update) => dispatch(editProductThunk(id, update))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
