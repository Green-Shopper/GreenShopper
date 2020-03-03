const router = require('express').Router()
//Require product model
const {Product, User, Order, OrderSummary} = require('../db/models/')
module.exports = router

//FInd all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//Find product by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const foundProduct = await Product.findByPk(id)
    if (foundProduct) {
      res.json(foundProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    console.log('REQ.SESSION:,', req.session.userId)
    const productId = req.params.id
    const foundProduct = await Product.findByPk(productId)
    // const orderId = req.body.id
    // const userId = req.body.id
    const newOrder = await Order.create()
    newOrder.addProduct(foundProduct)
    newOrder.setUser(req.session.userId)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})
