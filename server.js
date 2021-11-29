const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

// load env Varibales
require('dotenv').config();


// init mongo atlas connection 
if (process.env.MONGODB_URL !== null) {
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('Mongo Database connection has been established.')
    })
    .catch((err)=>{
        console.log('Database connection has been failed', err.message, err)
    })
  }


const app = express();
const port = process.env.PORT || 3000;

let tasks = require('./routes/tasks');
let users = require('./routes/users');


// init body parser, If there is json inside it it will parse it
app.use(bodyParser.json());

// init url encoded url data parser
app.use(bodyParser.urlencoded({extended: false}))


// Middlewares set
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
    next();
})


app.set('port', port);

// setting up endpoints 
app.use('/api/tasks/', tasks)
app.use('/api/users/', users)

// static files middlewares 
app.use("/images", express.static(path.join('images')))

const server = http.createServer(app)

// logging up server errors
server.on('error', (err) =>{ 
    console.log("error in server", err.message, err)
})

// listening up server port 
server.on('listening', ()=>{
    console.log("I am listening on port: ", port)
})


server.listen(port);