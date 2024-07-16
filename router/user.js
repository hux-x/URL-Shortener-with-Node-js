const express = require('express')
const router = express.Router()
const {handleGetAnalytics,handleUserSignUp} = require('../Controller/user')
router.post('/signup',handleUserSignUp)
router.get('/signup',(req,res)=>res.render('signup'))
router.get('/analytics',handleGetAnalytics)

module.exports = router