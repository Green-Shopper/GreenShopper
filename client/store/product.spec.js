import {expect} from 'chai'
import {createStore, applyMiddleware} from 'redux'
import enforceImmutableState from 'redux-immutable-state-invariant'

// You will write these functions
import {fetchedProducts, fetchedSingleProduct} from './product'
import reducer from './index.js'

const PLANTS = [
  {
    id: 1,
    title: 'ponytail palm',
    description:
      'Fun, distinct, and hardy. This plant is low-maintenance and adaptable.',
    price: 65,
    imgUrl: './defaultImg.jpg',
    stock: 50
  },
  {
    id: 2,
    title: 'calathea beauty star',
    description: 'Sweet and unique, with striped leaves',
    price: 35,
    imgUrl: './defaultImg.jpg',
    stock: 47
  },
  {
    id: 3,
    title: 'red prayer plant',
    description: 'Colorful and bold with hints of red on two-toned leaves',
    price: 35,
    imgUrl: './defaultImg.jpg',
    stock: 25
  }
]

function getRandomPlant(plants) {
  return plants[Math.floor(Math.random() * plants.length)]
}

describe('Action creators', () => {
  describe('fetchedProducts', () => {
    it('returns properly formatted action', () => {
      const plant = getRandomPlant(PLANTS)

      expect(fetchedProducts(products)).to.be.deep.equal({
        type: 'FETCH_PRODUCTS',
        products: products
      })
    })
  })

  describe('fetchedSingleProduct', () => {
    it('returns properly formatted action', () => {
      const plant = getRandomPlant(PLANTS)

      expect(fetchedSingleProduct(plant)).to.be.deep.equal({
        type: 'FETCH_SINGLE_PRODUCT',
        product: product
      })
    })
  })
}) // end Action creators

describe('Reducer', () => {
  it('returns the initial state by default', () => {
    // creates a store (for testing) using your (real) reducer
    const store = createStore(reducer, applyMiddleware(enforceImmutableState()))

    expect(store.getState().products).to.be.an('array')
    expect(store.getState().singleProduct).to.be.an('object')
  })

  describe('reduces on FETCH_PRODUCTS action', () => {
    it("sets the action's product as the fetchProducts on state (without mutating the previous state)", () => {
      const store = createStore(
        reducer,
        applyMiddleware(enforceImmutableState())
      )
      const prevState = store.getState()

      const plant = getRandomPlant(PLANTS)
      const action = {type: 'FETCH_PRODUCTS', products: products}
      store.dispatch(action)

      const newState = store.getState()

      // ensures the state is updated properly - deep equality compares the values of two objects' key-value pairs
      expect(store.getState().fetchedProducts).to.be.deep.equal(plant)
      // ensures we didn't mutate anything - regular equality compares the location of the object in memory
      expect(newState.fetchedProducts).to.not.be.equal(
        prevState.fetchedProducts
      )
      // ensures that unaffected state is preserved
      expect(newState.singleProduct).to.deep.equal(prevState.singleProduct)
    })
  })

  describe('reduces on FETCH_SINGLE_PRODUCT action', () => {
    it("sets the action's product as the fetchSingleProduct on state (without mutating the previous state)", () => {
      const store = createStore(
        reducer,
        applyMiddleware(enforceImmutableState())
      )
      const prevState = store.getState()

      const plant = getRandomPlant(PLANTS)
      const action = {type: 'FETCH_SINGLE_PRODUCT', singleProduct: product}
      store.dispatch(action)

      const newState = store.getState()

      expect(newState.fetchSingleProduct).to.be.deep.equal(plant)
      expect(newState.fetchSingleProduct).to.not.be.equal(
        prevState.fetchSingleProduct
      )
    })
  })

  describe('handles unrecognized actions', () => {
    it('returns the previous state', () => {
      const store = createStore(
        reducer,
        applyMiddleware(enforceImmutableState())
      )
      const prevState = store.getState()

      const action = {type: 'NOT_A_THING'}
      store.dispatch(action)

      const newState = store.getState()

      // these should be the same object in memory AND have equivalent key-value pairs
      expect(prevState).to.be.an('object')
      expect(newState).to.be.an('object')
      expect(newState).to.be.equal(prevState)
      expect(newState).to.be.deep.equal(prevState)
    })
  })
}) // end Reducer
