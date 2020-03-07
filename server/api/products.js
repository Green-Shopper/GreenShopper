const router = require('express').Router()
const {adminsOnly} = require('./utils')
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

//Delete product
router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const productId = req.params.id
    const foundProduct = await Product.findByPk(productId)
    if (!foundProduct) {
      console.error('Product not found, can not delete product')
      res.sendStatus(404)
    } else {
      const destroyedProduct = await foundProduct.destroy()
      res.json(destroyedProduct)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/editproduct/:id', adminsOnly, async (req, res, next) => {
  try {
    await Product.update(req.body, {where: {id: req.params.id}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
