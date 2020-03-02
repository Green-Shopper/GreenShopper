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
