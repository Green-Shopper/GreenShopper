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

// eslint-disable-next-line max-statements
Order.mergeGuestCartWithUserCart = async function(
  orderId,
  guestCart,
  userCart
) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>> You seein this!!!')
  const guest = {index: 0, length: guestCart.length}
  const user = {index: 0, length: userCart.length}
  let combinedCart = []
  let productToAdd

  const cart = await Order.findByPk(orderId)
  console.log('orderId: ', orderId)

  //add products to the combined cart in order
  while (guest.index < guest.length && user.index < user.length) {
    if (guestCart[guest.index].id === userCart[user.index].id) {
      console.log('in while loop guestCartId: ', guestCart[guest.index].id)
      const newQty =
        guestCart[guest.index].quantity + userCart[user.index].quantity
      await Order.updateQuantity(orderId, guestCart[guest.index].id, newQty)
      guest.index++
      user.index++
      guestCart[guest.index].quantity = newQty
      combinedCart.push(guestCart[guest.index])
      continue
    }
    if (guestCart[guest.index].id < userCart[user.index].id) {
      productToAdd = await Product.findByPk(guestCart[guest.index].id)
      console.log('product to add: ', productToAdd)
      await cart.addProduct(productToAdd)
      combinedCart.push(guestCart[guest.index])
      guest.index++
    } else {
      combinedCart.push(userCart[user.index])
      user.index++
    }
  }
  //spread remaing entries into the combinedCart array
  if (guest.index >= guest.length) {
    while (guest.index < guest.length) {
      productToAdd = await Product.findByPk(guestCart[guest.index].id)
      console.log('product to add: ', productToAdd)
      await cart.addProduct(productToAdd)
      combinedCart.push(guestCart[guest.index])
      guest.index++
    }
  } else {
    combinedCart = [...combinedCart, ...guestCart.slice(guest.index)]
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
