const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

Order.updateQuantity = async function(userId, productId, newQty) {
  const cartItem = await Order.findOne({
    where: {
      userId: userId,
      isCart: true
    },
    include: {
      model: Product,
      where: {
        id: productId
      }
    }
  })
  console.log('cartItems are: ', cartItem.dataValues.products[0].orderSummary)
  const orderSummary = cartItem.dataValues.products[0].orderSummary
  const update = await orderSummary.update({
    quantity: newQty
  })
  console.log('updated orderSUmmary is: ', update)
  const {
    id,
    title,
    description,
    price,
    imgUrl
  } = cartItem.dataValues.products[0]
  const updatedOrder = {
    id: id,
    title: title,
    description: description,
    price: price,
    imgUrl: imgUrl,
    quantity: newQty
  }
  return updatedOrder
}

module.exports = Order
