const Post = require('../database/models/Post');
const path = require('path');

module.exports =  (req, res)=>{
    const { image } = req.files;
    //console.log(path.resolve(__dirname, 'public/posts', image.name));
    image.mv(path.resolve(__dirname, '..','public/posts', image.name), (err)=> {
        
        Post.create({
            ...req.body,
            image: '/posts/'.concat(image.name)
        }, (err, post)=>{
            res.redirect('/');
        }) 
    });
}