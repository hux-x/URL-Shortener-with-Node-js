const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./Model/url");
const path = require('path')
const app = express();
connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

const router = require('./router/url')
app.use('/url',router)
 app.get('/redirect/:id',async(req,res)=>{
     let shortID = req.params.id
   const OGentry =  await URL.findOneAndUpdate({shortId:shortID},{$push:{visitHistory: {timestamp: Date.now()}}})
   res.redirect(OGentry.redirectURL);
 })
app.listen(5000,()=>{
    console.log('server listening on port : 5000')
})