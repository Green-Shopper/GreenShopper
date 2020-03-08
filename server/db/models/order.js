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

Order.mergeGuestCartWithUserCart = async function(
  orderId,
  guestCart,
  userCart
) {
  let guestIndex = 0
  const guestlength = guestCart.length
  let userIndex = 0
  const userlength = userCart.length
  let combinedCart = []

  const cart = await Order.findByPk(orderId)

  guestCart.sort((a, b) => a.id - b.id)
  userCart.sort((a, b) => a.id - b.id)

  //add products to the combined cart in order
  while (guestIndex < guestlength && userIndex < userlength) {
    if (guestCart[guestIndex].id === userCart[userIndex].id) {
      const newQty =
        guestCart[guestIndex].quantity + userCart[userIndex].quantity
      await Order.updateQuantity(orderId, guestCart[guestIndex].id, newQty)
      guestIndex++
      userIndex++
      guestCart[guestIndex].quantity = newQty
      combinedCart.push(guestCart[guestIndex])
      continue
    }
    if (guestCart[guestIndex].id < userCart[userIndex].id) {
      await cart.addProduct(guestCart[guestIndex])
      combinedCart.push(guestCart[guestIndex])
      guestIndex++
    } else {
      combinedCart.push(userCart[userIndex])
      userIndex++
    }
  }
  //spread remaing entries into the combinedCart array
  if (guestIndex >= guestlength) {
    while (guestIndex < guestlength) {
      await cart.addProduct(guestCart[guestIndex])
      combinedCart.push(guestCart[guestIndex])
      guestIndex++
    }
  } else {
    combinedCart = [...combinedCart, ...guestCart.slice(guestIndex)]
  }
  return combinedCart
}

Order.updateQuantity = async function(orderId, productId, newQty) {
  const cartItem = await OrderSummary.findOne({
    where: {
      orderId: orderId,
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
