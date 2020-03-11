import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div className="main-header">
        <div className="showcase container">
          <div className="row">
            <div className="col s12 m10 offset-m1 center">
              <div className="card-panel grey-text">
                {displayName === 'Login' ? (
                  <div>
                    New shopper? <Link to="/signup">Sign Up</Link>
                    <form onSubmit={handleSubmit} name={name}>
                      <div className="input-field">
                        <i className="material-icons prefix grey-text">email</i>
                        <label htmlFor="email">Email</label>
                        <input
                          name="email"
                          type="email"
                          className="validate grey-text text-darken-2"
                          required
                        />
                      </div>

                      <div className="input-field">
                        <i className="material-icons prefix grey0text">lock</i>
                        <label htmlFor="password">Password</label>
                        <input
                          name="password"
                          type="password"
                          className="validate grey-text text-darken-2"
                          required
                        />
                      </div>
                      <div className="input-field center">
                        <button className="btn" type="submit">
                          {displayName}
                        </button>
                      </div>
                      {error &&
                        error.response && <div> {error.response.data} </div>}
                    </form>
                    <div className="input-field center">
                      <a
                        className="waves-effect waves-light btn-small blue"
                        href="/auth/google"
                      >
                        <i className="fab fa-google left" />
                        {`${displayName} with Google`}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3>Sign up! It's Free.</h3>
                    <p>
                      Returning shopper? <Link to="/login">Login</Link>
                    </p>
                    <form onSubmit={handleSubmit} name={name}>
                      <div>
                        <div className="row">
                          <div className="input-field col s6 l6">
                            <i className="material-icons prefix grey-text">
                              person
                            </i>
                            <label htmlFor="firstName">First Name</label>
                            <input
                              name="firstName"
                              type="text"
                              className="validate grey-text text-darken-2"
                              required
                            />
                            <span
                              className="helper-text"
                              data-error="* required"
                            />
                          </div>
                          <div className="input-field col s6 l6">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                              name="lastName"
                              type="text"
                              className="validate grey-text text-darken-2"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="input-field">
                        <i className="material-icons prefix grey-text">email</i>
                        <label htmlFor="email">Email</label>
                        <input
                          name="email"
                          type="email"
                          className="validate grey-text text-darken-2"
                          required
                        />
                      </div>
                      <div className="input-field">
                        <i className="material-icons prefix grey-text">lock</i>
                        <label htmlFor="password">Password</label>
                        <input
                          name="password"
                          type="password"
                          className="validate grey-text text-darken-2"
                          required
                        />
                      </div>
                      <div className="input-field center">
                        <button className="btn" type="submit">
                          {displayName}
                        </button>
                      </div>
                      {error &&
                        error.response && <div> {error.response.data} </div>}
                    </form>
                    <div className="input-field center">
                      <a
                        className="waves-effect waves-light btn-small blue"
                        href="/auth/google"
                      >
                        <i className="fab fa-google left" />{' '}
                        {`${displayName} with Google`}
                      </a>
                    </div>
                  </div>
                )}
                {/* end form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value

      let firstName = ''
      let lastName = ''
      if (evt.target.firstName) {
        firstName = evt.target.firstName.value
      }
      if (evt.target.lastName) {
        lastName = evt.target.lastName.value
      }
      console.log(
        'formName',
        formName,
        'firstName: ',
        firstName,
        'lastName: ',
        lastName
      )

      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
