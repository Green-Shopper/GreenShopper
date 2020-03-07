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
      stock: '',
      tag: ''
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
      stock: '',
      tag: ''
    })
  }

  render() {
    return (
      <div className="main-header">
        <div className="showcase container">
          <div className="row">
            <div className="col s12 m10 offset-m1">
              <div className="card-panel grey-text">
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Title:
                    <input
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                      className="validate grey-text text-darken-2"
                      required
                    />
                  </label>

                  <label>
                    Description:
                    <input
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                      className="validate grey-text text-darken-2"
                      required
                    />
                  </label>

                  <label>
                    Price:
                    <input
                      type="number"
                      name="price"
                      onChange={this.handleChange}
                      value={this.state.price}
                      className="validate grey-text text-darken-2"
                      required
                    />
                  </label>

                  <label>
                    Image URL:
                    <input
                      type="text"
                      name="imgUrl"
                      onChange={this.handleChange}
                      value={this.state.imgUrl}
                      className="validate grey-text text-darken-2"
                      required
                    />
                  </label>

                  <label>
                    Stock:
                    <input
                      type="number"
                      name="stock"
                      onChange={this.handleChange}
                      value={this.state.stock}
                      className="validate grey-text text-darken-2"
                      required
                    />
                  </label>
                  <label>
                    Tag: (low light, medium light, bright light)
                    <input
                      type="text"
                      name="tag"
                      onChange={this.handleChange}
                      value={this.state.tag}
                      className="validate grey-text text-darken-2"
                    />
                  </label>
                  <br />
                  <br />
                  <button className="btn" type="submit">
                    Add Product
                  </button>
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
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  addNewProduct: newProduct => dispatch(addProductThunk(newProduct))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
