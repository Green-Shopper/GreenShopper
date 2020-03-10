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
    console.log('PREVIOUS ORDERS:,', prevOrders)
    let orderIds = []
    let orderHistory = []
    for (let i = 0; i < prevOrders.length; i++) {
      let order = prevOrders[i]
      let orderId = order.id
      orderIds.push(orderId)
    }
    console.log('ORDER IDS', orderIds)
    for (let i = 0; i < orderIds.length; i++) {
      console.log('ORDER ID AT I:', orderIds[i])
      const orders = await OrderSummary.findAll({where: {orderId: orderIds[i]}})
      // console.log('ORDERS==================', orders[i].dataValues)
      // console.log('ORDERS.DATAVALS==================', orders[i].dataValues)
      orderHistory.push(orders)
    }

    res.json(orderHistory)
  } catch (error) {
    next(error)
  }
})

module.exports = router
