const express = require('express'); // acts as server
const bodyParser = require('body-parser'); // allows us to send json data to nodejs app
const cors = require('cors'); // npm i cors --save cross origin resourse sharing 

// Package import and local import
const { mongoose } = require('./db.js'); // destructing syntax
var employeeController = require('./controllers/employeeController.js')

var app = express();
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:4200'}))

app.listen(3000,()=>{
    console.log("Server started at port: 3000")
})

app.use('/employees',employeeController)