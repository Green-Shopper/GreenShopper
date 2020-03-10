import axios from 'axios'

export const FETCH_USERS = 'FETCH_USERS'

export const fetchedUsers = function(users) {
  return {
    type: FETCH_USERS,
    users
  }
}

export const fetchUsersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(fetchedUsers(data))
  } catch (error) {
    console.error(error)
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return [...action.users]
    default:
      return state
  }
}

export default usersReducer
