const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./Model/url");
const path = require('path')
const app = express();
const {handleRedirect} = require('./Controller/url')
app.use(express.urlencoded({extended:false}))
app.use(express.json());
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const userRouter = require('./router/user')
const router = require('./router/url')
connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.use('/user',userRouter)
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
app.use('/url',router)


 app.get('/redirect/:id',handleRedirect)
app.listen(5000,()=>{
    console.log('server listening on port : 5000')
})