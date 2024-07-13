const express = require('express')
const router = express.Router()
const {restrictAnalytics} = require('../middleware/restrictAnalytics')
const {handleAdminLogin,handleFormRender,handleGetAnalytics} = require('../Controller/user')
router.post('/admin',handleAdminLogin)
router.get('/admin',handleFormRender)

router.post('/analytics',handleGetAnalytics)
module.exports = router