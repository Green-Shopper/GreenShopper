const router = require('express').Router()
const {Product, Order, OrderSummary} = require('../db/models/')

//Add to cart
router.post('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    const quantityToBuy = req.body.quantity
    const foundProduct = await Product.findByPk(productId)
    if (quantityToBuy > foundProduct.dataValues.stock) {
      res.send('Sorry not enough currently in stock')
    } else {
      const newOrder = await Order.create()
      const cartItem = {
        id: foundProduct.dataValues.id,
        title: foundProduct.dataValues.title,
        description: foundProduct.dataValues.description,
        price: foundProduct.dataValues.price,
        imgUrl: foundProduct.dataValues.imgUrl,
        quantity: quantityToBuy
      }
      await newOrder.addProduct(foundProduct)
      await newOrder.setUser(req.session.userId)
      res.json(cartItem)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
