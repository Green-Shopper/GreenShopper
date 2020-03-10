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
    return (
      <div>
        <h1 id="allUsersHeading">All Users</h1>
        <div>
          {this.props.theUsers.map(function(user) {
            return (
              <ul key={user.id}>
                <h3>{user.firstName + ' ' + user.lastName} </h3>
                <div>Email: {user.email}</div>
                <p />
                <div>id: {user.id}</div>
                <p />
                <button type="submit">
                  <Link to={`/userCart/${user.id}`}>Edit Cart</Link>
                </button>
              </ul>
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
