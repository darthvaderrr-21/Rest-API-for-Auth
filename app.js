require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const passport = require('passport')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();

// Database connection
const db_url = 'mongodb://localhost/rest_api_auth'
mongoose.connect(db_url, {useNewUrlParser: true})

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('Database connected...')
})
connection.on('error', () => {
    console.log('Connection failed!')
})

// swagger


const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'User authentication API',
            version:'1.0.0',
            description:'Restfull API for user authentication',
            contact:{
                name:'',
                url:'',
                email:''
            },
            servers:["http://localhost:3300"]
        }
    },
    apis:["app.js"]
}

const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the employee
 *     example: 'John wick'
 *    email:
 *     type: string
 *     description: email of the employee
 *     example: 'wick@email.com'
 *    password:
 *     type: string
 *     description: password of user
 *     example: 'pass123'
 */


/**
  * @swagger
  * /register:
  *  post:
  *   summary: Register a new user
  *   description: adding a new user in DB
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/User'
  *   responses:
  *    200:
  *     description: employee created succesfully
  *    500:
  *     description: failure in creating employee
  */


/**
 * @swagger
 * /employees:
 *  get:
 *   summary: get the loggedIn employee
 *   description: get the loggedIn employee
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */


// Use passport(Authentication)
const passportInit = require('./config/passport')
passportInit(passport)
app.use(passport.initialize())
// app.use(passport.session())


// Add Globla variable

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', routes)

app.use((req,res,next)=>{
    res.locals.user = req.user
    next()
})


// Server
const PORT = process.env.PORT || 3300
app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`)
})