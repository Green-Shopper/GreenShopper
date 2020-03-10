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
      tag: 'low light'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    M.FormSelect.init(this.FormSelect)
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
    this.props.history.push('/productadded')
  }

  render() {
    return (
      <div className="main-header">
        <div className="showcase container">
          <div className="row">
            <div className="col s12 m10 offset-m1">
              <div className="card-panel grey-text">
                <div className="center">
                  <h4>New Product Form</h4>
                </div>
                <br />
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col s12 l12">
                      <label>Title: </label>
                      <input
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        value={this.state.title}
                        className="validate grey-text text-darken-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 l12">
                      <label>Description: </label>
                      <input
                        type="text"
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        className="validate grey-text text-darken-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 l12">
                      <label>Price: (in pennies)</label>
                      <input
                        type="number"
                        name="price"
                        onChange={this.handleChange}
                        value={this.state.price}
                        className="validate grey-text text-darken-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 l12">
                      <label>Image URL:</label>
                      <input
                        type="text"
                        name="imgUrl"
                        onChange={this.handleChange}
                        value={this.state.imgUrl}
                        className="validate grey-text text-darken-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 l12">
                      <label>Stock: </label>
                      <input
                        type="number"
                        name="stock"
                        onChange={this.handleChange}
                        value={this.state.stock}
                        className="validate grey-text text-darken-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 l12">
                      <label>Tag:</label>
                      <select
                        ref={FormSelect => {
                          this.FormSelect = FormSelect
                        }}
                        name="tag"
                        onChange={this.handleChange}
                      >
                        <option value="0" disabled defaultValue>
                          Choose a Light Condition
                        </option>
                        <option value="low light">Low Light</option>
                        <option value="medium light">Medium Light</option>
                        <option value="high light">High Light</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col s12 l12">
                      <button className="btn" type="submit">
                        Add Product
                      </button>
                    </div>
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
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  addNewProduct: newProduct => dispatch(addProductThunk(newProduct))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
