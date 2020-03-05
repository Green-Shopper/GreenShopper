import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName, imgUrl} = props

  return (
    <div>
      <section className="products">
        <div className="row">
          {/* <UserNav /> */}
          <div className="col s9 l9" id="products">
            <h3 className="center grey-text text-darken-1">
              Welcome, {firstName}!
            </h3>
            <div className="row">
              <div className="col s12 l3">
                {imgUrl ? (
                  <img src={imgUrl} className="circle responsive-img" />
                ) : (
                  <img
                    src="img/basicprofile.jpg"
                    className="circle responsive-img"
                  />
                )}
              </div>
              <div className="col s12 l9">
                {/* FORM START */}
                <div className="row">
                  <form className="col s12">
                    <div className="row">
                      <div className="input-field col s6">
                        <input
                          id="first_name2"
                          type="text"
                          className="validate"
                        />
                        <label className="black-text" forHtml="first_name2">
                          {firstName}
                        </label>
                        <span
                          className="helper-text"
                          data-error="wrong"
                          data-success="right"
                        >
                          update by clicking on field
                        </span>
                      </div>
                      <div className="input-field col s6">
                        <input
                          id="first_name2"
                          type="text"
                          className="validate"
                        />
                        <label className="black-text" forHtml="first_name2">
                          {lastName}
                        </label>
                        <span
                          className="helper-text"
                          data-error="wrong"
                          data-success="right"
                        >
                          update by clicking on field
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          disabled
                          value="I am not editable"
                          id="disabled"
                          type="text"
                          className="validate"
                        />
                        {/* <label for="disabled">Disabled</label> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="first_name2"
                          type="text"
                          className="validate"
                        />
                        <label className="black-text" forHtml="first_name2">
                          {email}
                        </label>
                        <span
                          className="helper-text"
                          data-error="wrong"
                          data-success="right"
                        >
                          update by clicking on field
                        </span>
                      </div>
                    </div>
                  </form>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Update Changes
                  </button>
                </div>
                {/* FORM END */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    imgUrl: state.user.imgUrl
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
