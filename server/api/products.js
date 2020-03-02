const router = require('express').Router()
//Require product model
const {Product, User, Order} = require('../db/models/')
module.exports = router

//FInd all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      //Eager loading
      include: [{model: User}, {model: Order}]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//Find product by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const foundProduct = await Product.findByPk(
      id,
      //Eager Loading
      {
        include: [{model: User}, {model: Order}]
      }
    )
    if (foundProduct) {
      res.json(foundProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
