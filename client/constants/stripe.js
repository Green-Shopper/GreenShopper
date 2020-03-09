const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_swgZVNKN4tyqgBXKrWl8R5HW000gFy8jra'
export default STRIPE_PUBLISHABLE
