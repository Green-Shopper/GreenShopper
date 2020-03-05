import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

export class Checkout extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     order: '',
  //     products: ''
  //   }
  // }
  // async componentDidMount() {
  //   const {data} = axios.get(`/api/orders/${id}`)
  //   this.setState({
  //     order: data,
  //     products: data.products
  //   })
  // }
  render() {
    return (
      <div>
        <h1>Test</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
