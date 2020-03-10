import axios from 'axios'

const FETCH_ORDERS = 'FETCH_ORDERS'

export const fetchedOrders = orders => {
  return {
    type: FETCH_ORDERS,
    orders
  }
}

export const fetchOrdersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orderhistory')
    dispatch(fetchedOrders(data))
  } catch (error) {
    console.error(error)
  }
}

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return [...action.orders]
    default:
      return state
  }
}

export default ordersReducer
