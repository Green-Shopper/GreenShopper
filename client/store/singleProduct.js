import axios from 'axios'

const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

export const fetchedSingleProduct = product => ({
  type: FETCH_SINGLE_PRODUCT,
  product
})

export const editedProduct = (id, update) => ({type: EDIT_PRODUCT, id, update})

export const editProductThunk = (id, update) => async dispatch => {
  try {
    await axios.put(`/api/products/editproduct/${id}`, {
      title: update.title,
      description: update.description,
      price: update.price,
      imgUrl: update.imgUrl,
      stock: update.stock
    })
    dispatch(editedProduct(id, update))
  } catch (error) {
    console.error(error)
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

//REDUCER
const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return {...action.product}
    case EDIT_PRODUCT:
      return {...action.update}
    default:
      return state
  }
}

export default singleProductReducer
