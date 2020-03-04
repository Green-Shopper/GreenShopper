import React from 'react'
// import {connect} from 'react-redux'
// import {fetchUsersThunk} from '../store/allUsers'

export const AllUsers = props => {
  // props.fetchUsers()
  console.log('logging props', props)
  return (
    <div>
      <h1 id="allUsersHeading">All Users</h1>
      <div>
        {props.users.map(function(user) {
          return (
            <ul key={user.id}>
              <h3>name: {user.firstName + ' ' + user.lastName} </h3>
              <div>Email: {user.email}</div>
              <p />
              <div>id: {user.id}</div>
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
