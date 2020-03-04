/* eslint-disable no-case-declarations */
import axios from 'axios'

//ACTION TYPES
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//ACTION CREATORS
export const fetchedProducts = products => ({type: FETCH_PRODUCTS, products})

export const addedProduct = newProduct => ({type: ADD_PRODUCT, newProduct})
export const deletedProduct = productId => ({type: DELETE_PRODUCT, productId})

//THUNK CREATORS
export const fetchProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(fetchedProducts(data))
  } catch (error) {
    console.error('Find All Products Thunk Error:', error)
  }
}

export const addProductThunk = newProduct => async dispatch => {
  try {
    const {data} = await axios.post(`api/products`, newProduct)
    dispatch(addedProduct(data))
  } catch (error) {
    console.error('Add Product Thunk Error:', error)
  }
}

export const deleteProductThunk = productId => async dispatch => {
  try {
    await axios.delete(`api/products/${productId}`)
    dispatch(deletedProduct(productId))
  } catch (error) {
    console.error('Delete Product Thunk Error:', error)
  }
}

//REDUCER
const productsReducers = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...action.products]
    case ADD_PRODUCT:
      // eslint-disable-next-line no-case-declarations
      return [...state, action.newProduct]
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}

export default productsReducers
