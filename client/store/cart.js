import axios from 'axios'

//ACTION TYPES
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const REMOVE_PRODUCT_TO_CART = 'REMOVE_PRODUCT_TO_CART'

//ACTION CREATORS
export const addedProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

const removedProductFromCart = productId => ({
  type: REMOVE_PRODUCT_TO_CART,
  productId
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

//INITIAL STATE
const initialState = []

//REDUCER
const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      let updatedProduct
      //map the old cart and create a copy of it
      const previousCartCopy = state.map(product => {
        //if product added is in the cart already update the quantity
        if (product.id === action.product.id) {
          updatedProduct = Object.assign({}, product)
          updatedProduct.quantity += action.product.quantity
          return updatedProduct
        } else {
          return product
        }
      })
      let updatedCart = [...previousCartCopy]
      //if we did not update a product in the cart add the new product
      if (!updatedProduct) {
        updatedCart = [...updatedCart, action.product]
      }
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
