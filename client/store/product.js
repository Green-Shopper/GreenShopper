/* eslint-disable no-case-declarations */
import axios from 'axios'

//ACTION TYPES
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//ACTION CREATORS
export const fetchedProducts = products => ({type: FETCH_PRODUCTS, products})
export const fetchedSingleProduct = product => ({
  type: FETCH_SINGLE_PRODUCT,
  product
})
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

export const fetchSingleProductThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(fetchedSingleProduct(data))
  } catch (error) {
    console.error('Fetch Single Product Thunk Error:', error)
  }
}

export const addProductThunk = newProduct => async dispatch => {
  try {
    console.log('Add product thunk fired')
    const {data} = await axios.post(`api/products`, newProduct)
    dispatch(addedProduct(data))
  } catch (error) {
    console.error('Add Product Thunk Error:', error)
  }
}

export const deleteProductThunk = productId => async dispatch => {
  try {
    console.log('Delete product thunk fired')
    await axios.delete(`api/products/${productId}`)
    dispatch(deletedProduct(productId))
  } catch (error) {
    console.error('Delete Product Thunk Error:', error)
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
    case DELETE_PRODUCT:
      const oldProducts = [...state.products]
      const remainingProducts = oldProducts.filter(
        product => product.productId !== action.id
      )
      return {...state, products: remainingProducts}
    default:
      return state
  }
}

export default productReducers
