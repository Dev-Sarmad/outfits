# How to setup a typescript based nodejs backend application : 

```bash
1- npm init -y

2- npm intall -D typescript @types/node @tsconfig/node22 tsx

3- npm install express + -D @types/express

4- setup the package.json file (

inside the script add the dev : tsx watch server.ts (reload server on changes)

)
```

# How to load env files 

- Install the dotenv package in the app

- open the root of the app and create a .env file and put all of the secret variables along with values

- Now at the top of your root file i.e server.ts or app.ts import dotenv/config to laod .env 

# How to make a connection with the mongodb database using the mongoose 

- create a db file inside the config folder inside that file create a function called databaseConnection

- Inside the function we make connection by mongoose.connect which require the connection string and return a promise.

- mongoose.connection.on is an event listener which keep an eye on the status of the mongoose.connect actions.

- Now import that function inside the root file server.ts of the app and create a function called start server inside that await the databaseConnection(); and then run the app.listen then start the server now the db is connected with your application.

# Global Error Handler

- first we have to create a seprate file name the apiError in which we extends this class from Error class.

- Add the variables like statusCode, success, data, error.

- Define the contructor method which contains statuCode, error, message and stack.

- Call the super method super(message) and assign the values to the class object variables Error.captureStackTrace(this, this.constructor);

- Error capture trace is a nodejs feature which allow us to track from where the error was thrown.

- Error capture require the Error object (this) created from ApiError which nodejs attaches .stack property on it and this.contructor will be for (Hide everything through ApiError constructor).

- A stack (or call stack) is a record of the functions that were called to reach the current point in your program.

- Imagine your application has hundreds of files and thousands of functions.

You get an error:

```bash Cannot read property 'name' of undefined ```

Without a stack trace you'd have no idea where it happened.

With a stack trace:
```bash
TypeError: Cannot read property 'name' of undefined
    at getUserProfile (user.service.ts:25)
    at getUser (user.controller.ts:10)
    at processRequest (server.ts:50)
```
# How to make a auth validation middleware 

- schema based validation using the zod where we create schema register and login schemas in auth.validation.ts 

- create a middleware 