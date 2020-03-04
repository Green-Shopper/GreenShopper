import axios from 'axios'

const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT'

export const fetchedSingleProduct = product => ({
  type: FETCH_SINGLE_PRODUCT,
  product
})

export const fetchSingleProductThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(fetchedSingleProduct(data))
  } catch (error) {
    console.error('Fetch Single Product Thunk Error:', error)
  }
}

//REDUCER
const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return {...action.product}
    default:
      return state
  }
}

export default singleProductReducer
