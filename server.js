const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // mongodb
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')
const app = express();
require('dotenv/config');

const indexRouter = require('./routes/index');
const animeRouter = require('./routes/anime');
const loginRouter = require('./routes/login');

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret:process.env.SESSION_SECRET, saveUninitialized:false, resave:false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/anime', animeRouter);
app.use('/login', loginRouter);

// db connection

mongoose.connect('mongodb+srv://Angelv18:Togoonie1@cluster0.h5q3tl3.mongodb.net/crud_app?retryWrites=true&w=majority', ()=>{
	console.log('connected to mongo');
})

app.listen(process.env.PORT, () => {
  console.log('listening...');
})