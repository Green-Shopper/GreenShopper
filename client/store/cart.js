import axios from 'axios'

//ACTION TYPES
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'
const REMOVE_PRODUCT_TO_CART = 'REMOVE_PRODUCT_TO_CART'

//ACTION CREATORS
export const addedProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

export const fetchCartItems = items => ({
  type: FETCH_CART_ITEMS,
  items
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

export const setProductsInCart = () => async dispatch => {
  try {
    const data = [
      {
        title: 'otherTitle',
        description: 'otherDescription',
        price: 5,
        id: 2,
        imgUrl:
          'https://media.istockphoto.com/vectors/cartoon-monster-plant-vector-id657964702?k=6&m=657964702&s=612x612&w=0&h=oLf4yrg4bD0JAPG6BryX9ujLSwJC_Zg5z6ZYpR-hGco='
      },
      {
        title: 'sampleTitle',
        description: 'sampleDescription',
        price: 7,
        id: 1,
        imgUrl:
          'https://cdn3.vectorstock.com/i/1000x1000/90/22/cute-cactus-in-sunglasses-holding-lifebuoy-and-vector-18249022.jpg'
      }
    ]
    dispatch(fetchCartItems(data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE

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
    case FETCH_CART_ITEMS:
      return {...state, itemsInCart: action.items}
    default:
      return state
  }
}

export default cartReducers
