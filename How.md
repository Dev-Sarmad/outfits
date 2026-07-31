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

# Auth Check endpoint 
- The function of this is to check weather the user is authenticated or not quite usefull for the frontend of the application we hit the api from frontend when the client app load first. 

- If the user is authenticated means the frontend have the tokens we just have to send those tokens to the backend which varified by the middleware if the token verified then we will get the actual user object in the response.

- The problem it solve it is when i loggedin using the redux toolkit as soon as i refresh the page the state vanished because redux manage state in browsers javascript memory. So to tackle that we have to build a function at the top of your application each time it sends the request when rendering Provider component.

- When we are doing more than just fetching the data use the createAsyncThunk handle the response state or error in extra reducers because the action creator and action are not in a local reducers these are managed by the thunk when dispatched.