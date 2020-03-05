const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

Order.getAllItemsInCart = async function(userId) {
  console.log('Get all items class method userId: ', userId)
  const dbOrderData = await Order.findAll({
    where: {
      userId: userId,
      isCart: true
    },
    include: {
      model: Product
    }
  })

  console.log('dbOrderData is: ', dbOrderData)

  const allCartItems = dbOrderData.map(order => {
    const {id, title, description, price, imgUrl} = order.dataValues.products[0]
    const cartItem = {
      id: id,
      title: title,
      description: description,
      price: price,
      imgUrl: imgUrl,
      quantity: order.products[0].dataValues.orderSummary.dataValues.quantity
    }
    return cartItem
  })
  return allCartItems
}

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
  const orderSummary = cartItem.dataValues.products[0].orderSummary
  await orderSummary.update({
    quantity: newQty
  })
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
