let user = require('../Model/user')
const {v4:uuidv4} = require('uuid')
const {setUser} = require('../services/auth')
let handleUserSignUp = async (req,res)=>{
    const {name,email,password} = req.body
    const sessionId = uuidv4()
    setUser(sessionId,User)
    res.cookie("uid",sessionId)
   await user.create({
        name,password,email
    })
    res.redirect('/url')
}

let handleUserLogin = async(req,res)=>{
  const {email,password} = req.body
  console.log(email,password)
  const User = await user.findOne({email,password})
  if(!User){
    res.render('userLogin')
  }else{
    const token = await setUser(User)
    res.cookie("uid",token)
    res.redirect('/url')

  }   
}

let handleAdminLogin = async (req,res)=>{
    const {name,email,password} = req.body
   const User = await user.find({
        name,password,email
    })
    if(User){
       return res.redirect('/url/analytics')
    }
    res.redirect('/admin')
}
const URL = require('../Model/url')
const handleGetAnalytics = async (req, res) => {
    try {
      const User = req.user
      if(User){
        const result = await URL.find({createdBy: User._id}); 
        console.log(result)
        res.render('analytics', { urls:result }); 
      }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
};

const handleFormRender = async(req,res)=>{
    // if(req.cookie.uid) redirect('/analytics')
    res.render('login')
}
module.exports = {handleFormRender,handleAdminLogin,handleGetAnalytics,handleUserSignUp,handleUserLogin}