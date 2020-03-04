//Middleware function(s) to stay DRY
const adminsOnly = (req, res, next) => {
  if (!req.user || (req.user && !req.user.isAdmin)) {
    const error = new Error('You are not authorized to do that')
    error.status = 401
    return next(error)
  } else {
    next()
  }
}

module.exports = {
  adminsOnly
}
