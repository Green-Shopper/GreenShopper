import axios from 'axios'

//ACTION TYPES
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const REMOVE_PRODUCT_TO_CART = 'REMOVE_PRODUCT_TO_CART'
const UPDATE_PRODUCT_QTY_IN_CART = 'UPDATE_PRODUCT_QTY_IN_CART'

//ACTION CREATORS
export const addedProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

const removedProductFromCart = productId => ({
  type: REMOVE_PRODUCT_TO_CART,
  productId
})

const updatedProductQtyInCart = updatedProduct => ({
  type: UPDATE_PRODUCT_QTY_IN_CART,
  updatedProduct
})

//THUNK CREATORS
//productToAdd is an object with two values
//{id: product Id, quantity: quantity to buy}
export const addProductToCartThunk = productToAdd => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/cart/${productToAdd.id}`,
      productToAdd
    )
    dispatch(addedProductToCart(data))
  } catch (error) {
    console.error(
      'An error occurred in thunk while adding product to cart. Error: ',
      error
    )
  }
}

export const removeProductFromCartThunk = productId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${productId}`)
    dispatch(removedProductFromCart(productId))
  } catch (error) {
    console.error(
      'An error occurred in thunk while removing product from cart. Error: ',
      error
    )
  }
}

export const updateProductQtyInCart = updateInfo => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${updateInfo.id}`, updateInfo)
    console.log('data recieved back from api: ', data)
    dispatch(updatedProductQtyInCart(data))
  } catch (error) {
    console.error(
      'An error occurred in the thunk while updating product quantity in cart. Error: ',
      error
    )
  }
}

//INITIAL STATE
const initialState = []

//REDUCER
const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      if (state.length < 1) return [action.product]
      return [...state, action.product]
    }
    case UPDATE_PRODUCT_QTY_IN_CART: {
      const updatedCart = state.map(product => {
        console.log('in reducer:', product, action)
        if (product.id === action.updatedProduct.id) {
          return action.updatedProduct
        } else {
          return product
        }
      })
      return updatedCart
    }
    case REMOVE_PRODUCT_TO_CART: {
      const previousCartCopy = []
      for (let i = 0; i < state.length; i++) {
        if (+state[i].id !== +action.productId) {
          previousCartCopy.push(state[i])
        }
      }
      return previousCartCopy
    }
    default:
      return state
  }
}

export default cartReducers
