const router = require('express').Router()
const {Product, Order, OrderSummary, User} = require('../db/models/')
//Get all items currently in cart user cart
// router.get('/', async (req, res, next) => {
//   console.log('req.user is: ', req.user)
//   console.log('req.session is: ', req.session)
//   try {
//     //hard coded user remember to change
//     const allCartItems = await Order.getAllItemsInCart(req.session.orderId)
//     res.json(allCartItems)
//   } catch (error) {
//     console.error(
//       'An error occurred in the get all cart items route. Error: ',
//       error
//     )
//     next(error)
//   }
// })
//Get all items currently in a users cart
//remember to add adminsOnly
// router.get('/:id', async (req, res, next) => {
//   try {
//     const allCartItems = await Order.getAllItemsInCart(req.params.id)
//     res.json(allCartItems)
//   } catch (error) {
//     console.error(
//       'An error occurred in the get all cart items route. Error: ',
//       error
//     )
//     next(error)
//   }
// })
router.get('/', async (req, res, next) => {
  try {
    const cartId = req.user.dataValues.id //change this to be cartId
    console.log('REQ USER DATAVALUE', req.user.dataValues)
    const allCartItems = await OrderSummary.findAll({
      where: {orderId: cartId}
    })
    res.json(allCartItems)
  } catch (error) {
    console.error(
      'An error occurred in the get all cart items route. Error: ',
      error
    )
    next(error)
  }
})
//Find all - just for testing...
// router.get('/', async (req, res, next) => {
//   const allOrders = await Order.findAll()
//   console.log('REQ.SESSION:', req.session)
//   res.send(allOrders)
// })
// //Find cart by ID
// router.get('/:id/confirmation', async (req, res, next) => {
//   const {userId} = req.session
//   try {
//     const orders = await Order.findAll({
//       where: {
//         userId: userId,
//         isCart: false
//       },
//       include: {
//         model: Product
//       }
//     })
//     res.json(orders)
//   } catch (error) {
//     next(error)
//   }
// })
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
  // const productId = req.params.id
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
