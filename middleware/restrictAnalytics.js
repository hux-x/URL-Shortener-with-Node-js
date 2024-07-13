const {getUser} = require('../services/auth')


const restrictAnalytics = (req,res,next)=>{
    
    if(!res.cookie.uid) res.redirect('./user/admin')

    const user = getUser(req.cookies.uid)
    if(user){
        req.user = user
    }
    next();

}
module.exports = {restrictAnalytics}