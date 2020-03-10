import axios from 'axios'

const GET_CART_BY_ID = 'GET_CART_BY_ID'
const REMOVE_PRODUCT_FROM_USER_CART = 'REMOVE_PRODUCT_FROM_USER_CART'
const UPDATE_PRODUCT_QTY_IN_USER_CART = 'UPDATE_PRODUCT_QTY_IN_USER_CART'

const getCartById = cart => ({
  type: GET_CART_BY_ID,
  cart
})

const removedProductFromUserCart = productId => ({
  type: REMOVE_PRODUCT_FROM_USER_CART,
  productId
})

const updatedProductQtyInUserCart = updatedProduct => ({
  type: UPDATE_PRODUCT_QTY_IN_USER_CART,
  updatedProduct
})

export const getCartByIdThunk = ID => async dispatch => {
  try {
    let {data} = await axios.get(`/api/cart/${ID}`)
    dispatch(getCartById(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeProductFromUserCartThunk = (
  productId,
  cartId
) => async dispatch => {
  try {
    console.log('logging cartId in redux', cartId)
    await axios.delete(`/api/cart/${productId}`, {data: {cartId}})
    dispatch(removedProductFromUserCart(productId))
  } catch (error) {
    console.error(
      'An error occurred in thunk while removing product from cart. ',
      error
    )
  }
}
export const updateProductQtyInUserCartThunk = updateInfo => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${updateInfo.id}`, updateInfo)
    dispatch(updatedProductQtyInUserCart(data))
  } catch (error) {
    console.error(
      'An error occurred in the thunk while updating product quantity in cart. ',
      error
    )
  }
}

const userCartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART_BY_ID:
      return [...action.cart]
    case REMOVE_PRODUCT_FROM_USER_CART: {
      // eslint-disable-next-line no-case-declarations
      const previousCartCopy = []
      for (let i = 0; i < state.length; i++) {
        if (+state[i].id !== +action.productId) {
          previousCartCopy.push(state[i])
        }
      }
      return previousCartCopy
    }
    case UPDATE_PRODUCT_QTY_IN_USER_CART: {
      const updatedCart = state.map(product => {
        if (product.id === action.updatedProduct.id) {
          return action.updatedProduct
        } else {
          return product
        }
      })
      return updatedCart
    }
    default:
      return state
  }
}

export default userCartReducer
