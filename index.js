const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./Model/url");

const app = express();
connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());


const router = require('./router/url')
app.use('/url',router)
app.get('/:id',async(req,res)=>{
    let shortID = req.params.id
  const OGentry =  await URL.findOneAndUpdate({shortID},{$push:{visitHistory: {timestamp: Date.now()}}})
  res.redirect(OGentry.redirectURL);
})
app.listen(5000,()=>{
    console.log('server listening on port : 5000')
})