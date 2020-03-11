import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Footer} from './Footer'

class Home extends Component {
  // constructor({handleClick, isLoggedIn}) {
  //   super({handleClick, isLoggedIn})
  // }

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="showcase container">
            <div className="row">
              <div className="col s12 m10 offset-m1 center">
                <div className="card-panel grey-text text-darken-1">
                  <h5>Welcome to Green Shopper</h5>
                  <h1>The Online Plant Shop</h1>
                  <i className="fas fa-leaf fa-3x" />
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sit fugit deserunt quos provident aliquam inventore.
                  </p>
                  <br />
                  <br />
                  <Link
                    to="/products"
                    className="waves-effect waves-light btn btn-large white lime-text text-darken-3"
                  >
                    View Products
                  </Link>
                  {this.props.isLoggedIn ? null : (
                    <Link
                      to="/signup"
                      className="waves-effect waves-light btn btn-large lime darken-3 white-text"
                    >
                      Sign Up
                    </Link>
                  )}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <section className="section section-icons center">
          <div className="container">
            <div className="row">
              <div className="col s12 m4">
                <div className="card-panel">
                  <i className="fa fa-user fa-3x cyan-text text-darken-2" />
                  <h5 className="grey-text text-darken-4">Free Account</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                    suscipit!
                  </p>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card-panel">
                  <i className="fas fa-box-open fa-3x cyan-text text-darken-2" />
                  <h5 className="grey-text text-darken-4">Free Shipping</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                    suscipit!
                  </p>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card-panel">
                  <i className="fas fa-seedling fa-3x cyan-text text-darken-2" />
                  <h5 className="grey-text text-darken-4">Quality Plants</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                    suscipit!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <h4 className="center">
                <span className="cyan-text text-darken-2">Featured</span> Plants
              </h4>
              <div className="col s12 m4 lf4">
                <div className="card">
                  <div className="card-image">
                    <img src="img/prayerplant.jpg" alt="" />
                    <span className="card-title grey-text text-darken-2">
                      Prayer Plant
                    </span>
                  </div>
                  <div className="card-content">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas aliquid fugiat corporis laudantium, architecto
                      delectus?
                    </p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <img src="img/monstera2.jpg" alt="" />
                    <span className="card-title grey-text text-darken-2">
                      Monstera
                    </span>
                  </div>
                  <div className="card-content">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas aliquid fugiat corporis laudantium, architecto
                      delectus?
                    </p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <img src="img/pilea4.jpg" alt="" />
                    <span className="card-title grey-text text-darken-2">
                      Pilea
                    </span>
                  </div>
                  <div className="card-content">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas aliquid fugiat corporis laudantium, architecto
                      delectus?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 center">
                <Link
                  to="/products"
                  className="waves-effect waves-light btn btn-large cyan darken-2 btn-darken-1 white-text"
                >
                  Start Shopping <i className="fas fa-shopping-basket" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Home)

/**
 * PROP TYPES
 */
