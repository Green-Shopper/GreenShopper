import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrdersThunk} from '../store'
import {v4 as uuidv4} from 'uuid'

const Order = ({order}) => (
  <ul key={uuidv4()}>
    <li>Order Id: {order.orderId}</li>
    <li>Product Id: {order.productId}</li>
    <li>Qty: {order.quantity}</li>
    <li>Unit Price: {`$${(order.priceAtCheckOut / 100).toFixed(2)}`}</li>
  </ul>
)

const OrderContainer = ({orders}) => {
  const orderTotal = orders.reduce((acc, currentOrder) => {
    const newTotal = acc + currentOrder.priceAtCheckOut * currentOrder.quantity
    return newTotal
  }, 0)
  console.log(orderTotal)
  return (
    <div className="container">
      <p>Order Date: {orders[0].updatedAt}</p>
      {orders.map(order => <Order key={uuidv4()} order={order} />)}
      <p>Order Total: {`$${(orderTotal / 100).toFixed(2)}`}</p>
    </div>
  )
}

export class OrderHistory extends Component {
  async componentDidMount() {
    await this.props.getOrders()
  }

  render() {
    const {orders} = this.props
    console.log('PROPS', this.props)
    // const individualOrders = orders.map(order =>
    //   order.map(element => element.orderId)
    // )
    // console.log('ORDER IDs', individualOrders)
    return orders.map(function(ordersList) {
      return <OrderContainer key={uuidv4()} orders={ordersList} />
      // return (
      //   <ul key={uuidv4()}>
      //     <li>Order Id: {order.orderId}</li>
      //     <li>Product Id: {order.productId}</li>
      //     <li>Qty: {order.quantity}</li>
      //     <li>Price: {order.priceAtCheckout}</li>
      //   </ul>
      // )
    })
    // return <div className="container">{ordersList}</div>
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(fetchOrdersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
