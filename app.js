require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes');
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


// Add Globla variable
app.use((req,res,next)=>{
    res.locals.user = req.user
    next()
})


app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', routes)

// Server
const PORT = process.env.PORT || 3300
app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`)
})