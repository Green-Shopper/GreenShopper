const {expect} = require('chai')
const db = require('../db')
const {OrderSummary, Order, Product} = require('./index')

describe('OrderSummary model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('sets column values correctly', () => {
    let orderSummary
    let plant
    let order

    beforeEach(async () => {
      try {
        order = await Order.create()
        plant = await Product.create({
          title: 'needs a title',
          description: 'Architectural and very low maintenance.',
          price: 199.0,
          imgUrl: './defaultImg.jpg',
          stock: 100
        })
        orderSummary = await OrderSummary.create({
          quantity: 15,
          priceAtCheckOut: 245.0,
          orderId: order.dataValues.id,
          productId: plant.dataValues.id
        })
      } catch (error) {
        console.error(
          'An error occurred while creating orderSummary. Error: ',
          error
        )
      }
    })

    it('sets quantity', () => {
      expect(orderSummary.quantity).to.be.equal(15)
    })

    it('sets priceAtCheckout', () => {
      expect(orderSummary.priceAtCheckOut).to.be.equal(245.0)
    })
  }) //end sets column values correctly tests

  describe('sets default values correctly', () => {
    let orderSummary
    let order
    let plant

    beforeEach(async () => {
      try {
        order = await Order.create()
        plant = await Product.create({
          title: 'needs a title',
          description: 'Architectural and very low maintenance.',
          price: 199.0,
          imgUrl: './defaultImg.jpg',
          stock: 100
        })
        orderSummary = await OrderSummary.create({
          priceAtCheckOut: 245.0,
          orderId: order.dataValues.id,
          productId: plant.dataValues.id
        })
      } catch (error) {
        console.error(
          'An error occurred while creating orderSummary. Error: ',
          error
        )
      }
    })

    it('sets quantity to 0 by default', () => {
      expect(typeof orderSummary.quantity).to.be.equal('number')
      expect(orderSummary.quantity).to.be.equal(0)
    })
  })
}) //end OrderSummary tests
