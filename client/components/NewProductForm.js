import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/products'

export class NewProductForm extends Component {
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewProduct(this.state)
    //Below is resetting the state for the fields of the form
    this.setState({
      title: '',
      description: '',
      price: '',
      imgUrl: '',
      stock: ''
    })
  }

  render() {
    return (
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
            name="imgUrl"
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

        <button type="submit">Add Product</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  addNewProduct: newProduct => dispatch(addProductThunk(newProduct))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
