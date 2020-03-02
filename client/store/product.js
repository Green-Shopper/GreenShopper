import axios from 'axios'

//ACTION TYPES
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

//ACTION CREATORS
const fetchedProducts = products => ({type: FETCH_PRODUCTS, products})

//THUNK CREATORS
export const fetchProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/products`)
    dispatch(fetchedProducts(data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {
  products: []
}

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productReducers
