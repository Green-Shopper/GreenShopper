const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')
const OrderSummary = require('./order-summary')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

Order.getAllItemsInCart = async function(cartId) {
  const cart = await Order.findByPk(cartId)
  const allOrders = await cart.getProducts()

  const allCartItems = allOrders.map(order => {
    const {id, title, description, price, imgUrl} = order.dataValues
    const cartItem = {
      id: id,
      title: title,
      description: description,
      price: price,
      imgUrl: imgUrl,
      quantity: order.dataValues.orderSummary.dataValues.quantity
    }
    return cartItem
  })
  return allCartItems
}

Order.updateQuantity = async function(orderId, productId, newQty) {
  const cartItem = await OrderSummary.findOne({
    where: {
      orderId: 53,
      productId: productId
    }
  })
  const product = await Product.findByPk(productId)

  await cartItem.update({
    quantity: newQty
  })

  //consider adding attributes to the found product
  //we could then use object spread here instead
  const {id, title, description, price, imgUrl} = product.dataValues
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
