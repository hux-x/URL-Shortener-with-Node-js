const express = require('express')
const router = express.Router()
const {handleGenerateShortUrl,handleGetAnalytics} = require('../Controller/url')
router.post('/',handleGenerateShortUrl)
router.get('/analytics',handleGetAnalytics)
router.get('/',(req,res)=>{
    res.render('Home') 
})
module.exports = router