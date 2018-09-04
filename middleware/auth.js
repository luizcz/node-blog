const User = require('../database/models/User')

module.exports = (req, res, next) =>{
    User.findById(req.session.userId, (error, user)=>{
        if(error || !user){
            res.redirect('/')
        }else{
            next()
        }
    })

}