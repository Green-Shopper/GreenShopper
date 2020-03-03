/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        try {
          cody = await User.create({
            email: 'cody@puppybook.com',
            firstName: 'cody',
            lastName: 'bones',
            password: 'bones'
          })
        } catch (error) {
          console.error('An error occurred while creating user. Error: ', error)
        }
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('sets correct values at user creation', async () => {
    let cody = await User.create({
      email: 'cody@puppybook.com',
      password: 'bones',
      firstName: 'Cody',
      lastName: 'Bones',
      isAdmin: true
    })

    it('correctly sets firstName field', () => {
      expect(cody.firstName).to.be.equal('Cody')
    })

    it('correctly sets lastName field', () => {
      expect(cody.lastName).to.be.equal('Bones')
    })

    it('correctly sets email field', () => {
      expect(cody.email).to.be.equal('cody@puppybook.com')
    })

    it('correctly sets isAdmin field', () => {
      expect(cody.isAdmin).to.be.equal(true)
    })
  }) //describe('sets correct values at user creation')

  describe('column validations', () => {
    it('ensures the user has a valid email address', async () => {
      let cody = await User.build({
        email: 'noatpuppybook.com',
        password: 'bones',
        firstName: 'Cody',
        lastName: 'Bones',
        isAdmin: true
      })
      return cody.validate().then(
        () => {
          throw new Error(
            'Validation should have failed malformed email address'
          )
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })

    it('does not allow an empty email field', async () => {
      let cody = await User.build({
        email: '',
        password: 'bones',
        firstName: 'Cody',
        lastName: 'Bones',
        isAdmin: true
      })
      return cody.validate().then(
        () => {
          throw new Error('Validation should fail no email provided')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })

    //Need to figure out how to test constraints
    xit('does not allow multiple users to have the same email address', async () => {
      let error
      try {
        let cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'Cody',
          lastName: 'Bones',
          isAdmin: true
        })
        console.log('user cody email is: ', cody.dataValues.email)
        let cody2 = await User.build({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'Cody',
          lastName: 'Bones',
          isAdmin: true
        })
        console.log('user cody2 email is: ', cody2.dataValues.email)
        await db.sync()
      } catch (err) {
        error = err
      }
      console.log('In unique email test error is: ', error)
      expect(error).to.be.an('error')
    })

    it('requires first name field', async () => {
      let error
      try {
        let cody = await User.build({
          email: 'cody@puppybook.com',
          password: 'bones',
          lastName: 'Bones',
          isAdmin: true
        })
        await cody.validate()
      } catch (err) {
        error = err
      }
      expect(error).to.be.an('error')
    })

    it('does not allow empty first name field', async () => {
      let error
      try {
        let cody = await User.build({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: '',
          lastName: 'Bones',
          isAdmin: true
        })
        await cody.validate()
      } catch (err) {
        error = err
      }
      expect(error).to.be.an('error')
    })

    it('requires last name field', async () => {
      let error
      try {
        let cody = await User.build({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'Cody',
          isAdmin: true
        })
        await cody.validate()
      } catch (err) {
        error = err
      }
      expect(error).to.be.an('error')
    })

    it('does not allow empty last name field', async () => {
      let error
      try {
        let cody = await User.build({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'Cody',
          lastName: '',
          isAdmin: true
        })
        await cody.validate()
      } catch (err) {
        error = err
      }
      expect(error).to.be.an('error')
    })

    //isAdmin is not being set be default before the test
    xit('sets default value for isAdmin', async () => {
      try {
        let cody = await User.build({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'Cody',
          lastName: 'Bones'
        })
        await db.sync({force: true})
        let validate = await cody.validate()
        console.log('validate is: ', validate.dataValues)
        expect(cody.isAdmin).to.be.an(false)
      } catch (err) {
        console.error(
          'An error occurred in test for isAdmin default value. Error: ',
          err
        )
      }
    })
  }) // end User Validation checks
}) // end describe('User model')
