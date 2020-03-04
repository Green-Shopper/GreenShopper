const router = require('express').Router()
const {Product, Order, OrderSummary} = require('../db/models/')

//Remove from cart
router.delete('/:id', async (req, res, next) => {
  const {userId} = req.session
  try {
    const orders = await Order.findAll({
      where: {
        userId: userId,
        isCart: true
      },
      include: {
        model: Product,
        where: {
          id: req.params.id
        }
      }
    })
    for (let i = 0; i < orders.length; i++) {
      await orders[i].destroy()
    }
    res.json(orders)
  } catch (error) {
    console.error(
      'An error occurred in the remove from cart delete route. Error: ',
      error
    )
    next(error)
  }
})

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
