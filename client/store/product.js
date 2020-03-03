import axios from 'axios'

//ACTION TYPES
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

//ACTION CREATORS
export const fetchedProducts = products => ({type: FETCH_PRODUCTS, products})
export const fetchedSingleProduct = product => ({
  type: FETCH_SINGLE_PRODUCT,
  product
})
export const addedProduct = newProduct => ({type: ADD_PRODUCT, newProduct})

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

export const addProductThunk = newProduct => async dispatch => {
  try {
    console.log('Add product thunk fired')
    const {data} = await axios.post(`api/products`, newProduct)
    dispatch(addedProduct(data))
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
    case ADD_PRODUCT:
      // eslint-disable-next-line no-case-declarations
      const newProduct = [...state.products, action.newProduct]
      return {...state.products, products: newProduct}
    default:
      return state
  }
}

export default productReducers
