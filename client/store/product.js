import axios from 'axios'

//ACTION TYPES
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT'

//ACTION CREATORS
const fetchedProducts = products => ({type: FETCH_PRODUCTS, products})
const fetchedSingleProduct = product => ({type: FETCH_SINGLE_PRODUCT, product})

//THUNK CREATORS
export const fetchProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(fetchedProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleProductThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(fetchedSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {
  products: [],
  singleProduct: {}
}

//REDUCER
const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, products: action.products}
    case FETCH_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}

export default productReducers
