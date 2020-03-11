# Green Shopper

A plant shopping E-commerce site developed by Fullstack Academy students.

`Backend` - express, sequelize

`Frontend` - react, redux

`style` - materializeCSS

`Deployment` - Continuous deployment with travis

`Deployed Link`: https://green-shopper.herokuapp.com/

## Team Members:

* AAron Staton [GitHub](https://github.com/Astaton)
* Dylan Horgan [GitHub](https://github.com/dyhorgan)
* Manny Garcia [GitHub](https://github.com/mannyxgarcia)
* Mike Damato [GitHub](https://github.com/Mike-Damato)

## Start MacOS/Linux

First clone
Start with `npm install` to get all our dependencies

Running `npm run start-dev` will get you shopping!

Running `createdb green-shopper` will create our database.

Running `npm run seed` will fill the database with stunning plants!

Visit `http://localhost:8080` to start shopping on a local server.

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

## Testing

`createdb green-shopper-test` creates the test db

`npm test` will run mocha and chai testing

## Customize

* Create a file called secrets.js in the project root
* This file is listed in .gitignore, and will only be required in your development environment
* Its purpose is to attach the secret environment variables that you will use while developing
* However, it's very important that you not push it to Github! Otherwise, prying eyes will find your secret API keys!
* It might look like this:
  ```javascript
  process.env.GOOGLE_CLIENT_ID = 'Your Google Client ID here'
  process.env.GOOGLE_CLIENT_SECRET = 'Your Google Client Secret here'
  process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

## OAuth

* To use OAuth with Google, complete the steps above with a real client ID and client secret supplied from Google
* You can get them from the [Google APIs dashboard](https://console.developers.google.com/apis/credentials).
