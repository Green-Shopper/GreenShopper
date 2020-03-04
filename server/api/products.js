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

//Add product to store
router.post('/', async (req, res, next) => {
  console.log('in post no id route')
  try {
    const newProduct = await Product.create(req.body)
    if (!newProduct) {
      console.error('Can not create product')
    } else {
      res.send(newProduct)
    }
  } catch (error) {
    next(error)
  }
})
