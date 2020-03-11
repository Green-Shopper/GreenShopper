import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrdersThunk} from '../store'
import {v4 as uuidv4} from 'uuid'

const Order = ({order}) => (
  <ul key={uuidv4()}>
    <li>
      Order Id: <b>{order.orderId}</b>
    </li>
    <li>
      Product Id: <b>{order.productId}</b>
    </li>
    <li>
      Unit Price: <b>{`$${(order.priceAtCheckOut / 100).toFixed(2)}`}</b>
    </li>
    <li>
      Qty: <b>{order.quantity}</b>
    </li>
  </ul>
)

const OrderContainer = ({orders}) => {
  const orderTotal = orders.reduce((acc, currentOrder) => {
    const newTotal = acc + currentOrder.priceAtCheckOut * currentOrder.quantity
    return newTotal
  }, 0)
  return (
    <div className="container center">
      <span className="card-title">Order no. {orders[0].orderId}</span>
      <p>
        Order Date: <b>{orders[0].updatedAt}</b>
      </p>
      {orders.map(order => <Order key={uuidv4()} order={order} />)}
      <div className="card-action">
        Order Total:{' '}
        <b className="red-text">{`$${(orderTotal / 100).toFixed(2)}`}</b>
      </div>
    </div>
  )
}

export class OrderHistory extends Component {
  async componentDidMount() {
    await this.props.getOrders()
  }

  render() {
    const {orders} = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            {orders.map(function(ordersList) {
              return (
                <div className="card" key={uuidv4()}>
                  <div className="card-content">
                    <div>
                      <OrderContainer key={uuidv4()} orders={ordersList} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(fetchOrdersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
