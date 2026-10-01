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

# The admin Product enpoints 

## Create a product 
When the admin hit he route /api/product the request is first checked weather the user is authenticated or not after the the role of the authenticated user is checked if its is not a user then throw error of insufficient permissions. 
```bash

productRouter.post(
  "/",
  authentication,
  authorization("admin"),
  validate(createProductSchema),
  createProduct,
);

```
If all gone right then validate the create product payload using a validation middleware in which we pass the createProductSchema which the admin pass after validation the request is headed towards the controller. The controller handshake the createProductService which perform the database operations by the db layer of the product resource i.e product.repository.ts which is reponsible for the database operations.

The createProductService takes the payload and user which admin is creating a product.
```bash 
const product = await createProductService(request.body, request.user!._id); 
```
The admin which creates a product does'nt be passed via client it is passes in a request and at the time of creating a product it is provided which user created it where we extends the createProductInput so that it matched with schema.
```bash
interface CreateProductRepositoryInput
  extends CreateProductInput {
  createdBy: mongoose.Types.ObjectId;
}
```
# File upload using Cloudinary Multer 

## Multer Middleware
We handle the file uploads inside the nodejs application using multer it creates the middleware and configure how uploads are handled.

Inside the multer we have an object called diskStorage which tells how the files are saved inside the server. It provide the destination, filename functions for it each function accept three parameter req, file, callback function. The request object, file is for the metadata of file and cb which multer calls for every upload file and wait so that it can have a file name , destination at a runtime. Basically Multer calls this function and waits for you to tell it what the filename, destination should be. It have error and value arguments. 

path.extname(file.originalname)) it returns the file extension with . from uploaded file. 

File filter is a method which checks the file type allowance weather to upload or not by checking file.mimetype.startsWith("image/") as the all images contains it.

# Config the Cloudinary and create a utility function uploadToCloudinary

The controller recieves the files in a request which have a type express.multer.file
it passes that to the service which responsible for a product creation.

const imageUrls = await Promise.all(images.map(uploadToCloudinary)); once all files are uploaded on cloudinary then create a product via repo layer  but first we also have to change a little bit in the schema service and create product input as we are not adding validation on images fields.

# Integrate RTK Query inside the frontend app
First createApi slice for all of your server side requests from the application.
We config the name of the api, baseUrl and the endpoints asscocitated with it.

The slice is created now connect it with the redux store. Register the baseApi in the store and rtk middleware which acts a delivery truck to dispatch the network requests, check the cache expiry,refetch or is it a component making request data is already cached or not ?

Now inject the specific endpoints for orders, products etc in a seprate feature api file.

Seprated the admin related stuff inside the application because admin have diffrent functionalities so have to divide our app to a normal users and the admin access stuff.

Created a seprate folder for the admin in which the stuff like dashboard stats, admin routes pages and crud of the products as of now are managed.

The adminRoute is a protected route component which is responsible that only role as admin can access this route. If it matched admin can route anywhere in the children route match, and adminLayout outlet allow us to render current admin page inside it. 

Whenever react sees /admin index:true it renders that component/page first 