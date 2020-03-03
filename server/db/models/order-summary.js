const Sequelize = require('sequelize')
const db = require('../db')

const OrderSummary = db.define('orderSummary', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  priceAtCheckOut: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderSummary
