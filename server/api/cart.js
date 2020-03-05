const router = require('express').Router()
const {Product, Order, User} = require('../db/models/')
const {adminsOnly} = require('./utils')

//Get all items currently in users cart
router.get('/', async (req, res, next) => {
  try {
    const allCartItems = await Order.getAllItemsInCart(req.user.id)

    res.json(allCartItems)
  } catch (error) {
    console.error(
      'An error occurred in the get all cart items route. Error: ',
      error
    )
    next(error)
  }
})

//Get new cart
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create()
    const user = await User.findByPk(req.user.dataValues.id)
    await user.update({cartId: newOrder.id})
    res.sendStatus(201)
  } catch (error) {
    console.error('An error occurred while creating a new cart')
    next(error)
  }
})

//Get all items currently in a users cart
router.get('/:id', adminsOnly, async (req, res, next) => {
  try {
    const allCartItems = await Order.getAllItemsInCart(req.params.id)

    res.json(allCartItems)
  } catch (error) {
    console.error(
      'An error occurred in the get all cart items route. Error: ',
      error
    )
    next(error)
  }
})

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

//update quantity in cart
router.put('/:id', async (req, res, next) => {
  const productId = req.params.id
  const quantityToAdd = req.body.quantity
  const userId = req.user.id
  try {
    const updatedOrder = await Order.updateQuantity(
      userId,
      productId,
      quantityToAdd
    )
    res.json(updatedOrder)
  } catch (error) {
    console.error(
      'An error occurred in put route to update product qty in cart. Error: ',
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
