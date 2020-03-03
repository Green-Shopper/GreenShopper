import axios from 'axios'

//ACTION TYPES
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

//ACTION CREATORS
const addedProductToCart = addDetails => ({
  type: ADD_PRODUCT_TO_CART,
  addDetails
})

//THUNK CREATORS
export const addedProductToCartThunk = id => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products/${id}`)
    console.log(data)
    //need to pass an object with product details and quantity added
    dispatch(addedProductToCart(data))
  } catch (error) {
    console.error(
      'An error occurred in thunk while adding product to cart. Error: ',
      error
    )
  }
}

//INITIAL STATE
const initialState = {
  itemsInCart: []
}

//REDUCER
const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      let updatedProduct
      //map the old cart and create a copy of it
      const previousCartCopy = state.itemsInCart.map(product => {
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
      return {...state, updatedCart}
    }
    default:
      return state
  }
}

export default cartReducers
