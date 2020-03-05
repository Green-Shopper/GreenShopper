import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserNav} from './user-nav'
import {updateUserThunk} from '../store/user'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  // const {email, firstName, lastName, imgUrl} = props
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // const id = this.props.match.params.id
    // this.props.fetchSingleProduct(id)
    this.setState({
      firstName: `${this.props.firstName}`,
      lastName: `${this.props.lastName}`,
      email: `${this.props.email}`,
      id: `${this.props.id}`,
      imgUrl: `${this.props.imgUrl}`
    })
    // console.log('FIRSTNAME', this.props.firstName)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    const userId = this.props.id
    event.preventDefault()
    this.props.updateUser(userId, this.state)
  }

  render() {
    const {firstName, imgUrl, googleId, email} = this.props
    return (
      <div>
        <section className="user-home-padding">
          <div className="row">
            <UserNav googleId={googleId} />
            <div className="col s9 l9" id="user-home-padding">
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
                  <div className="row">
                    <form onSubmit={this.handleSubmit} className="col s12">
                      <div className="row">
                        <div className="input-field col s6">
                          <input
                            type="text"
                            name="firstName"
                            onChange={this.handleChange}
                            value={this.state.firstName}
                            className="validate"
                          />
                          <label className="black-text" />
                          <span className="helper-text" data-error="wrong">
                            update by clicking on field
                          </span>
                        </div>
                        <div className="input-field col s6">
                          <input
                            type="text"
                            name="lastName"
                            onChange={this.handleChange}
                            value={this.state.lastName}
                            className="validate"
                          />
                          <label className="black-text" />
                          <span className="helper-text" data-error="wrong">
                            update by clicking on field
                          </span>
                        </div>
                      </div>
                      {googleId ? (
                        <div className="row">
                          <div className="input-field col s12">
                            <input
                              disabled
                              value={`${email} (google sign in)`}
                              id="disabled"
                              type="text"
                              className="validate"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="input-field col s12">
                            <input
                              type="text"
                              name="email"
                              onChange={this.handleChange}
                              value={this.state.email}
                              className="validate"
                            />
                            <label className="black-text" />
                            <span className="helper-text" data-error="wrong">
                              update by clicking on field
                            </span>
                          </div>
                        </div>
                      )}
                      <button
                        className="btn waves-effect waves-light"
                        type="submit"
                        name="action"
                      >
                        Update Changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    imgUrl: state.user.imgUrl,
    googleId: state.user.googleId,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: (id, update) => dispatch(updateUserThunk(id, update))
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
