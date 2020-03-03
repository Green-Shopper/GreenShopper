const {expect} = require('chai')
const db = require('../db')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('sets columns', () => {
    it('sets isCart to true by default', async () => {
      try {
        let order = await Order.create()

        expect(order.isCart).to.be.equal(true)
      } catch (error) {
        console.error('An error occurred while creating order. Error: ', error)
      }
    })
  })
}) // end model tests
