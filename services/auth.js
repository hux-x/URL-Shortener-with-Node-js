const jwt = require('jsonwebtoken')
const KEY = 'kalsdj4kljapd9uksadj90e948rowr'
async function setUser(user){
    
    return jwt.sign({user},KEY)
    
}
function getUser(token){
    if(!token) return null
   return jwt.verify(token,KEY)
}
module.exports = {setUser,getUser}