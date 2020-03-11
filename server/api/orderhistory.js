const router = require('express').Router()
const {Order, OrderSummary} = require('../db/models/')

router.get('/', async (req, res, next) => {
  try {
    console.log('USER ID:======', req.user.dataValues.id)
    const prevOrders = await Order.findAll({
      where: {
        userId: req.user.dataValues.id,
        isCart: false
      }
    })
    let orderIds = []
    let orderHistory = []
    for (let i = 0; i < prevOrders.length; i++) {
      let order = prevOrders[i]
      let orderId = order.id
      orderIds.push(orderId)
    }
    for (let i = 0; i < orderIds.length; i++) {
      const orders = await OrderSummary.findAll({where: {orderId: orderIds[i]}})
      orderHistory.push(orders)
    }

    res.json(orderHistory)
  } catch (error) {
    next(error)
  }
})

module.exports = router
