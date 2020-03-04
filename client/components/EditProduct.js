import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editProductThunk, fetchSingleProductThunk} from '../store/product'

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

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleProduct(id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    this.props.editProduct(this.props.match.params.id, this.state)
    //Below is resetting the state for the fields of the form
  }

  render() {
    // const product = this.props.products.singleProduct
    return (
      <div className="container">
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
            Price:
            <input
              type="number"
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
            />
          </label>

          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              onChange={this.handleChange}
              value={this.state.imgUrl}
            />
          </label>

          <label>
            Stock:
            <input
              type="number"
              name="stock"
              onChange={this.handleChange}
              value={this.state.stock}
            />
          </label>

          <button type="submit">Edit Product</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProductThunk(id)),
  editProduct: (id, update) => dispatch(editProductThunk(id, update))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
