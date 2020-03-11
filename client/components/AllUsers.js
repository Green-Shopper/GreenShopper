import React, {Component} from 'react'
// import {Redirect} from 'react-router-dom'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsersThunk} from '../store/allUsers'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    console.log('IMG URL=======', this.props.theUsers.map(user => user))
    return (
      <div>
        <h1 id="allUsersHeading">All Users</h1>
        <div>
          {this.props.theUsers.map(function(user) {
            return (
              <div key={user.id} className="container">
                <ul className="collection">
                  <li className="collection-item avatar">
                    <img src={user.imgUrl} className="circle" />
                    <span className="title">
                      <b>{user.firstName + ' ' + user.lastName}</b>
                    </span>
                    <p>
                      <b>Email:</b> {user.email}
                      <br />
                      <b>id:</b> {user.id}
                    </p>
                    <button
                      type="submit"
                      className="secondary-content btn waves-effect waves-light"
                    >
                      <Link className="white-text" to={`/userCart/${user.id}`}>
                        Edit Cart
                      </Link>
                    </button>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {theUsers: state.users}
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
