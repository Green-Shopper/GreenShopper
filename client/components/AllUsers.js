import React from 'react'
// import {Redirect} from 'react-router-dom'

import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {fetchUsersThunk} from '../store/allUsers'

export const AllUsers = props => {
  // props.fetchUsers()
  console.log('logging USers in AllUsers', props.users)
  //   const clickFunction = () => {
  //     console.log('firing clickFunction')
  //     return <ShoppingCart/>
  // }
  return (
    <div>
      <h1 id="allUsersHeading">All Users</h1>
      <div>
        {props.users.map(function(user) {
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

// const mapStateToProps = function(state){
//     return {allUsers: state.users}
//   }

//   const mapDispatchToProps = dispatch => ({
//     fetchUsers: () => dispatch(fetchUsersThunk())
//   })

// export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
