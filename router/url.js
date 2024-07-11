const express = require('express')
const router = express.Router()
const {handleGenerateShortUrl,handleGetAnalytics} = require('../Controller/url')
router.post('/',handleGenerateShortUrl)
router.get('/analytics/:id',handleGetAnalytics)
module.exports = router