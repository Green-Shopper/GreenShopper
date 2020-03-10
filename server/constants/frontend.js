const FRONTEND_DEV_URLS = ['http://localhost:8080']
const FRONTEND_PROD_URLS = [
  'https://www.green-shopper.herokuapp.com/',
  'https://green-shopper.herokuapp.com/'
]
module.exports =
  process.env.NODE_ENV === 'production' ? FRONTEND_PROD_URLS : FRONTEND_DEV_URLS
