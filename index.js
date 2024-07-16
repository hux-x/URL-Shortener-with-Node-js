const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./Model/url");
const path = require('path')
const app = express();
const cookieParser = require('cookie-parser')
const {restrictUser} = require('./middleware/restrictUser')
app.use(cookieParser())
app.use('/user',restrictUser)
app.use('/url',restrictUser)
const {handleUserLogin} = require('./Controller/user')
const {handleRedirect} = require('./Controller/url')
app.use(express.urlencoded({extended:false}))
app.use(express.json());
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
 
 app.post('/',handleUserLogin)
 app.get('/',(req,res)=>{
  if(req.cookies.uid){
   return res.redirect('/url')
  }
  res.render('userLogin')
 })
app.listen(5000,()=>{
    console.log('server listening on port : 5000')
})