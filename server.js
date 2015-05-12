// server.js

//BASE SETUP
//======================================================


//Call the packages we need
var express 	= require('express');
var bodyParser 	= require('body-parser');
var mongoose	= require('mongoose');
var app 		= express(); //This creates a new express app

//Configure BodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Set the server port
var port = process.env.PORT || 8880;

//Setup Mongo
mongoose.connect('mongodb://localhost/crossroads');

//Configure Router and Routes
//======================================================
var userRoutes = require('./app/routes/userRoutes');

//Register Routes
app.use('/user', userRoutes);

//Start the server
//=======================================================
app.listen(port);
console.log('Server working at port ' + port );