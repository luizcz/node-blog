const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:  {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    }, 
    password:  {
        type:String,
        required:true
    }
})

UserSchema.pre('save', function(next){
    const user = this;
    console.log(user)
    bcrypt.hash(user.password, 10, function(error, encr){
        console.log(encr)
        user.password = encr;
        next();
    })
    
})

const User = mongoose.model('User', UserSchema);

module.exports = User;