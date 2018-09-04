const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:  {
        type:String,
        required:[true, 'Please provide your username']
    },
    email: {
        type:String,
        required:[true, 'Please provide your e-mail'],
        unique:true
    }, 
    password:  {
        type:String,
        required:[true, 'Please provide your password']
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