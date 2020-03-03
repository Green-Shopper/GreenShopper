const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('sets correct values at product creation', () => {
    let plant
    beforeEach(async () => {
      try {
        plant = await Product.create({
          title: 'sugar cane',
          description: 'Very low maintenance.',
          price: 199.0,
          imgUrl: './defaultImg.jpg',
          stock: 100
        })
      } catch (error) {
        console.error('an error occured while creating product. Error: ', error)
      }
    })

    it('correctly sets title field', () => {
      expect(plant.title).to.be.equal('sugar cane')
    })

    it('correctly sets description field', () => {
      expect(plant.description).to.be.equal('Very low maintenance.')
    })

    it('correctly sets the price', () => {
      expect(typeof plant.price).to.be.equal('number')
      expect(plant.price).to.be.equal(199.0)
    })

    it('correctly sets the imgUrl', () => {
      expect(plant.imgUrl).to.be.equal('./defaultImg.jpg')
    })

    it('correctly sets the stock field', () => {
      expect(typeof plant.stock).to.be.equal('number')
      expect(plant.stock).to.be.equal(100)
    })
  }) // end describe('sets correct values at product creation')

  describe('column validations', () => {
    it('does not allow title to be empty', async () => {
      let error
      try {
        let plant = await Product.build({
          title: '',
          description: 'Architectural and very low maintenance.',
          price: 199.0,
          imgUrl: './defaultImg.jpg',
          stock: 100
        })
        await plant.validate()
      } catch (err) {
        // console.error(
        //   'expected error, title field was left empty. Error: ',
        //   err
        // )
        error = err
      }
      expect(error).to.be.an('error')
    })
  }) // end column validations
}) // end describe('Product model')
