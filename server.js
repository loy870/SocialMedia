const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express(); 

//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const DB = require('./config/keys').mongoURI;

//connect to mongodb
 
mongoose.connect(DB)
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(passport.initialize());

//Passport Config 

require('./config/passport')(passport);
//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.port || 5000 ;

app.listen(port, () => console.log('Server running on port: ' + port)); 