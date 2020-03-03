const router = require('express').Router()
//Require product model
const {Product, Order} = require('../db/models/')
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

// router.put('/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const foundProduct = await Product.findByPk(id, {
//       include: [{model: Order}]
//     })
//     if (orderId) {
//       //do something
//       OrderSummary.addProduct(id)
//     } else {
//       await OrderSummary.create(id)
//     }
//   } catch (error) {
//     next(error)
//   }
// })
