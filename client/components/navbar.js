import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <nav className="nav-wrapper lime darken-3">
      <div className="container">
        <Link to="/home" className="brand-logo left">
          <i className="fas fa-leaf" />
          GS
        </Link>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <ul className="right">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>{isAdmin && <Link to="/users">Users</Link>}</li>
              <li>
                <Link
                  to="/user"
                  className="btn-floating btn-medium waves-effect waves-light cyan darken-2"
                >
                  <i className="material-icons">person</i>
                </Link>
              </li>
              <li>
                <Link
                  to="/shoppingcart"
                  className="btn-floating btn-medium waves-effect waves-light yellow darken-2"
                >
                  <i className="material-icons">shopping_cart</i>
                </Link>
              </li>
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <ul className="right">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link
                  to="/shoppingcart"
                  className="btn-floating btn-medium waves-effect waves-light yellow darken-2"
                >
                  <i className="material-icons">shopping_cart</i>
                </Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
