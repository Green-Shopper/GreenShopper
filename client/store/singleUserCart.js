import axios from 'axios'

const GET_CART_BY_ID = 'GET_CART_BY_ID'

const getCartById = cart => ({
  type: GET_CART_BY_ID,
  cart
})

export const getCartByIdThunk = ID => async dispatch => {
  try {
    let {data} = await axios.get(`/api/cart/${ID}`)
    dispatch(getCartById(data))
  } catch (err) {
    console.error(err)
  }
}

const userCartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART_BY_ID:
      return [...action.cart]
    default:
      return state
  }
}

export default userCartReducer
