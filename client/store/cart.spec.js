import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {addProductToCartThunk} from './cart'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    itemsInCart: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('addToCart', () => {
    it('eventually dispatches the POST addedToCart  action', async () => {
      const fakeProductAdded = {
        title: 'red prayer plant',
        description: `Colorful and bold with hints of red on two-toned leaves`,
        price: 35.0,
        imgUrl: './defaultImg.jpg',
        quantity: 2
      }
      mockAxios.onPost('/api/products/1').replyOnce(200, fakeProductAdded)
      await store.dispatch(addProductToCartThunk(fakeProductAdded))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_PRODUCT_TO_CART')
      expect(actions[0].addDetails).to.be.deep.equal(fakeProductAdded)
    })
  })
})
