const User = require("../database/models/User")
const bcrypt = require('bcrypt')

module.exports = (req,res) => {
    const {email, password} = req.body;
    User.findOne({email: email}, (err, user)=>{
        if(user){
            bcrypt.compare(password, user.password, (error, result) =>{
                if(result){
                    req.session.userId = user._id;
                    res.redirect('/')
                }else{
                    res.redirect('/auth/login')
                }
            })
        }else{
            res.redirect('/auth/login')
        }
    })
    
}