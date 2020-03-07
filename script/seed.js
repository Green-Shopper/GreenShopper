'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
const productsSeedData = require('./product-seed-data')
const usersSeedData = require('./user-seed-data')
const ordersSeedData = require('./order-seed-data')

const log = []
async function seed() {
  async function assignOrdersToUsers(orders, users) {
    const ordersLen = orders.length
    const usersLen = users.length
    let userAtIndex = 0
    let ordersIndex = 0
    //while there are unassigned orders we continue this loop
    //on each iteration we assign the order to the next user in line
    //once we reach the end of the users array we start at the beggining of the array again
    while (ordersIndex < ordersLen) {
      userAtIndex = userAtIndex === usersLen ? 0 : userAtIndex
      log.push(`user: ${userAtIndex}, order: ${ordersIndex}`)
      await orders[ordersIndex].setUser(users[userAtIndex])
      userAtIndex++
      ordersIndex++
    }
    //assignment order is off with out this
    await orders[0].setUser(users[0])
  }

  async function assignCartIdsTOUsers(users, orders) {
    for (let i = 0; i < users.length; i++) {
      await users[i].update({cartId: orders[i].dataValues.id})
    }
  }

  async function assignProductsToOrders(products, orders) {
    await orders.forEach(async order => {
      let productNum = Math.floor(Math.random() * 8)
      while (productNum < products.length) {
        await order.addProduct(products[productNum])
        productNum += Math.floor(Math.random() * 6)
      }
    })
  }
  await db.sync({force: true})
  console.log('db synced!')

  const orders = await Promise.all(
    ordersSeedData.map(order => {
      return Order.create(order)
    })
  )

  const users = await Promise.all(
    usersSeedData.map(user => {
      return User.create(user)
    })
  )

  const products = await Promise.all(
    productsSeedData.map(product => {
      return Product.create(product)
    })
  )

  orders.sort((a, b) => a.dataValues.id - b.dataValues.id)
  users.sort((a, b) => a.dataValues.id - b.dataValues.id)
  await assignProductsToOrders(products, orders)
  await assignOrdersToUsers(orders, users)
  await assignCartIdsTOUsers(users, orders)

  console.log('>>>>>>log is: ', log)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
