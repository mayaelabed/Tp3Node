const express = require('express');
const app = express();
const post= require('./routes/post')
const auth= require('./routes/auth')
app.use(express.json());
app.use('/post',post);
app.use('/auth',auth);
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config()
const MONGODB_URI=process.env.MONGODB_URI
// const PORT = process.env.PORT || 9000
const PORT = process.env.PORT 
//connection to the mongodb and start server
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('Connected to mongodb')
    app.listen(PORT,()=>{
        console.log(`Server listening on ${PORT}`)
    })
}).catch(err=>{
    console.log('Error connecting to mongodb:',err.message)
})