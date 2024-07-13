const express = require('express')
const router = express.Router()
const {handleGenerateShortUrl,handleYoutubeDownload} = require('../Controller/url')
router.post('/',handleGenerateShortUrl)
// router.get('/analytics',handleGetAnalytics)
router.get('/',(req,res)=>{
    res.render('Home') 
})
router.post('/download',handleYoutubeDownload)
module.exports = router