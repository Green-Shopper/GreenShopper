const router = require('express').Router()
const {Product, Order, User} = require('../db/models/')
const {adminsOnly} = require('./utils')

//Get all items currently in users cart
router.get('/', async (req, res, next) => {
  try {
    const allCartItems = await Order.getAllItemsInCart(
      req.user.dataValues.cartId
    )

    res.json(allCartItems)
  } catch (error) {
    console.error(
      'An error occurred in the get all cart items route. Error: ',
      error
    )
    next(error)
  }
})

//remember to add adminsOnly

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
    const user = await User.findByPk(req.params.id)
    const allCartItems = await Order.getAllItemsInCart(user.dataValues.cartId)

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
  // const userId = req.session.passport.user

  const productId = req.params.id

  try {
    //req.user.dataValues.cartId changed to req.body.cartId
    if (
      req.body.cartId !== req.user.dataValues.cartId &&
      req.user.isAdmin !== true
    ) {
      res.send('You must be an Admin to do that')
    } else {
      const cart = await Order.findByPk(req.body.cartId)
      const product = await Product.findByPk(productId)
      cart.removeProduct(product)

      res.sendStatus(200)
    }
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
  console.log('')
  const productId = req.params.id
  const quantityToAdd = req.body.quantity

  try {
    if (
      req.body.cartId !== req.user.dataValues.cartId &&
      req.user.isAdmin !== true
    ) {
      res.send('You must be an Admin to do that')
    } else {
      const updatedOrder = await Order.updateQuantity(
        // req.user.dataValues.cartId,
        req.body.cartId,
        productId,
        quantityToAdd
      )
      res.json(updatedOrder)
    }
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
    const userId = req.user.dataValues.id

    const productId = req.params.id

    const quantityToBuy = req.body.quantity

    const foundProduct = await Product.findByPk(productId)

    if (quantityToBuy > foundProduct.dataValues.stock) {
      console.log('firing if')
      res.send('Sorry not enough currently in stock')
    } else {
      const cart = await Order.findByPk(req.user.dataValues.cartId)
      await cart.addProduct(foundProduct)
      if (quantityToBuy > 1) {
        await Order.updateQuantity(userId, productId, quantityToBuy)
      }
      //consider adding attributes to the found product
      //we could then use object spread here instead
      const cartItem = {
        id: foundProduct.dataValues.id,
        title: foundProduct.dataValues.title,
        description: foundProduct.dataValues.description,
        price: foundProduct.dataValues.price,
        imgUrl: foundProduct.dataValues.imgUrl,
        quantity: quantityToBuy
      }

      // await newOrder.addProduct(foundProduct)
      // //changed req.session.userId to req.user.id
      // await newOrder.setUser(req.user.id)
      console.log('cartItem logging', cartItem.title)
      res.json(cartItem)
    }
  } catch (error) {
    next(error)
  }
})

//Update cart status to false
router.put('/checkout', async (req, res, next) => {
  try {
    const cartId = req.user.dataValues.cartId
    const foundOrder = await Order.findByPk(cartId)
    foundOrder.update({isCart: false})
    res.json(foundOrder)
  } catch (error) {
    next(error)
  }
})

//Create a new cart
router.post('/checkout', async (req, res, next) => {
  try {
    const newCart = await Order.Create()
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
