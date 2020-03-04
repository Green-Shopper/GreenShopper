# Code Review I


## ReadMe

- Name + Description of app
- Link to Deployed version
- Instructions for running locally


## Git

- Semantic Commits
	1. Nature of commit (Feature, Fix, Documentation, Style, etc)
	2. Area of commit coverage (Models, Redux, API, travis, etc)
	3. Present-tense description of what commit does


## Trello Tickets

- Tickets look strong and granular, glad we are emphasizing them
- Keep them short, specific (15 mins - 2 hrs of estimated work)
- Mirror semantic commit style (Nature of ticket, area of coverage, description)

## Models

### Products

- Smart property types overall
- Price in Float is risky, because JS is bad at math. Consider the following:
	- Validator
	- Decimal property type
	- Integers (representing pennies)

### Orders

- Good job avoiding using Sequlize.Array on Order Products/Line items
	- This does not scale well
	- Sequelize.Array is acceptable only for collections that we don't expect to change
	- Arrays are *only* kosher in PostgreSQL
- Love that Order-summary is a join table, this will make it much easier to update the items in a cart
- Consider refactoring Order-Summary + Order models
- Consider adding Virtual property for Order price based on quantity and priceAtCheckout props
	- Virtual properties are Computed and save us db-space

## API

### Product Route

	- Adding to cart should be a PUT (POSTs are for Creating not updating)
	- Similarly, by RESTful standards, adding to cart should not be a product route, it should be an order_product/cart route

	RESTful
	- REpresentational
	- State
	- Transfer

	www.netflix.com/shows/blackmirror/5?time=33

	- You can REPRESENT the STATE of your app and TRANSFER it based on just the URL string

	- Security! We have an isAdmin property on our Users, how can we leverage that?

	```
	const isAdmin = () => req.user.isAdmin ? next() : res.send("GO AWAY!");

	app.get('/url', isAdmin, (req, res, next) => {
			Secrets.FindALL()
	})

	```

## Front-end

### React
	- Love our use of connected components, if we are connecting components, you can consider slimming them out to be pure Render/fat arrow components
	- Form components should always be stateful, dont necessarily need to be connected

### Redux
	- If using combineReducers, have 1 reducer per slice of state
	- avoid console.logs, they are impure. Use Redux Logger instead.



