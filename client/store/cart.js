import axios from 'axios'

//ACTION TYPES
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const MERGE_CARTS = 'MERGE_CARTS'
const REMOVE_PRODUCT_TO_CART = 'REMOVE_PRODUCT_TO_CART'
const UPDATE_PRODUCT_QTY_IN_CART = 'UPDATE_PRODUCT_QTY_IN_CART'
const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS'
const GET_NEW_CART = 'GET_NEW_CART'

//ACTION CREATORS
const addedProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

export const gotAllCartItems = cartItems => ({
  type: GET_ALL_CART_ITEMS,
  cartItems
})

const gotNewCart = () => ({
  type: GET_NEW_CART
})

const mergedGuestAndUserCart = combinedCarts => ({
  type: MERGE_CARTS,
  combinedCarts
})

const removedProductFromCart = productId => ({
  type: REMOVE_PRODUCT_TO_CART,
  productId
})

export const updatedProductQtyInCart = updatedProduct => ({
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
      'An error occurred in thunk while adding product to cart. ',
      error
    )
  }
}

export const getAllCartItemsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    console.log('data recieved from the db: ', data)
    dispatch(gotAllCartItems(data))
  } catch (error) {
    console.error(
      'An error occurred in thunk while getting all cart items from db. ',
      error
    )
  }
}

// export const getAllCartItemsForUserThunk = userId => async dispatch => {
//   console.log('getin users items userId: ', userId)
//   try {
//     const {data} = await axios(`/api/cart/${userId}`)
//     console.log('data recieved from the db: ', data)
//     dispatch(gotAllCartItems(data))
//   } catch (error) {
//     console.error(
//       'An error occurred in thunk while getting all cart items from db. ',
//       error
//     )
//   }
// }

export const getNewCartThunk = () => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart')
    console.log('data recieved from db', data)
    dispatch(gotNewCart())
  } catch (error) {
    console.error('An error occurred in thunk while getting new cart. ', error)
  }
}

//this thunk takes in an object with both the guest and user carts
//ex {guestCart: [], userCart: []}
export const mergeGuestAndUserCartThunk = guestAndUserCarts => async dispatch => {
  try {
    guestAndUserCarts.guestCart.sort((a, b) => a.id - b.id)
    guestAndUserCarts.userCart.sort((a, b) => a.id - b.id)
    const {data: mergedCarts} = await axios.patch(
      '/api/cart',
      guestAndUserCarts
    )
    console.log('data recieved from db', mergedCarts)
    dispatch(mergedGuestAndUserCart(mergedCarts))
  } catch (error) {
    console.error('An error occurred in thunk while merging carts. ', error)
  }
}

export const removeProductFromCartThunk = (
  productId,
  cartId
) => async dispatch => {
  try {
    console.log('logging cartId in redux', cartId)
    await axios.delete(`/api/cart/${productId}`, {data: {cartId}})
    dispatch(removedProductFromCart(productId))
  } catch (error) {
    console.error(
      'An error occurred in thunk while removing product from cart. ',
      error
    )
  }
}

export const updateProductQtyInCartThunk = updateInfo => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${updateInfo.id}`, updateInfo)
    dispatch(updatedProductQtyInCart(data))
  } catch (error) {
    console.error(
      'An error occurred in the thunk while updating product quantity in cart. ',
      error
    )
  }
}
//INITIAL STATE
const initialState = []

//REDUCER
// eslint-disable-next-line complexity
const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      if (state.length < 1) return [action.product]
      return [...state, action.product]
    }
    case GET_ALL_CART_ITEMS: {
      return [...action.cartItems]
    }
    case GET_NEW_CART: {
      return []
    }
    case MERGE_CARTS: {
      return [...action.combinedCarts]
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
    case UPDATE_PRODUCT_QTY_IN_CART: {
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

export default cartReducers
