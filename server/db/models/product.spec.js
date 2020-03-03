const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('sets correct values at product creation', async () => {
    let plant = await Product.create({
      title: 'yucca cane',
      description: 'Architectural and very low maintenance.',
      price: 199.0,
      imgUrl: './defaultImg.jpg',
      stock: 100
    })

    it('correctly sets title field', () => {
      expect(plant.title).to.be.equal('yucca cane')
    })

    it('correctly sets description field', () => {
      expect(plant.description).to.be.equal(
        'Architectural and very low maintenance.'
      )
    })

    it('correctly sets the price', () => {
      console.log(
        'in correctly set price typeof plant.price is: ',
        typeof plant.price
      )
      expect(typeof plant.price).to.be.equal('float')
      expect(plant.price).to.be.equal(199.0)
    })

    it('correctly sets the imgUrl', () => {
      expect(plant.imgUrl).to.be.equal('./defaultImg.jpg')
    })

    it('correctly sets the stock field', () => {
      console.log(
        'in set product stock field typeof product.stock is: ',
        typeof Product.stock
      )
      expect(typeof plant.stock).to.be.equal('integer')
      expect(plant.stock).to.be.equal(100)
    })
  })
})
