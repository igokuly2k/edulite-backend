//IMPORT REQUIRED PACKAGES AND ROUTES
const config = require('config');
const mongoose = require('mongoose');
const debug = require('debug')('app')
const express = require('express');
const app = express();
const admins = require('./routes/admins');
const adminLogin = require('./routes/adminLogin');
const colleges = require('./routes/colleges');
const meetings = require('./routes/meetings');
const sections = require('./routes/sections');
const studentLogin = require('./routes/studentLogin');
const students = require('./routes/students');
const teacherLogin = require('./routes/teacherLogin');
const teachers = require('./routes/teachers');
var mongoDBPassword, PORT;

//SETTING MONGODBPASSWORD, JWTPRIVATEKEY FROM ENV
if(!(mongoDBPassword = config.get('mongoDBPassword'))){
    console.error('FATAL ERROR: MongoDB Password is not defined');
    process.exit(1);
}
if(!(mongoDBPassword = config.get('jwtPrivateKey'))){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}
//CONNECTING TO MONGODB ATLAS
const uri= `mongodb+srv://admin:${mongoDBPassword}@edulite.g3lzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
try {
mongoose.connect(uri,{ useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true }, () => debug("Connected to MongoDB Atlas"))
}
catch (ex){
    console.log(ex);
}

 //USING MIDDLEWARES AND ROUTES
app.use(express.json());
app.use('/api/adminlogin',adminLogin);
app.use('/api/admins',admins);
app.use('/api/teacherlogin',teacherLogin);
app.use('/api/studentlogin',studentLogin);
app.use('/api/teachers',teachers);
app.use('/api/students',students);
app.use('/api/sections',sections);
app.use('/api/meetings',meetings);
app.use('/api/colleges',colleges);

//SETTING PORT FROM ENV AND LISTENING TO PORT 
if(!(PORT = config.get('PORT'))){
    console.error('FATAL ERROR: PORT is not defined');
    process.exit(1);
}
app.listen(PORT,()=> debug(`App Connected! Connect Using localhost:${PORT}`));