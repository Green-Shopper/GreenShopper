//Middleware function(s) to stay DRY
const adminsOnly = (req, res, next) => {
  if (!req.user || (req.user && !req.user.isAdmin)) {
    const error = new Error('You must be an admin to do that')
    error.status = 401
    return next(error)
  } else {
    next()
  }
}

const isUser = (req, res, next) => {
  if (!req.user) {
    const error = new Error('You must be logged in to do that')
    error.status = 401
    return next(error)
  } else {
    next()
  }
}

module.exports = {
  adminsOnly,
  isUser
}
