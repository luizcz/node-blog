const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const creatPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homepage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const creatUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')


const app = new express();
const mongoStore = connectMongo(expressSession)

mongoose.connect('mongodb://localhost/node-js-blog');

app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(expressSession({
    secret: 'secret', 
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
})
);

const validateCreatePostMiddleware = (req, res, next)=>{
    if(!req.files.image){
        return res.redirect('/post/new')
    }
    next();
}
app.use('/post/store',validateCreatePostMiddleware);

app.set('views', `${__dirname}/views`);



app.get("/", homePageController);

app.get("/about", (req, res)=>{
    res.render('about')
});

app.get("/post/new", creatPostController);
app.get("/post/:id",  getPostController);



app.post("/post/store", storePostController);
app.post("/users/register", storeUserController);
app.post("/users/login", loginUserController);

app.get("/contact", (req, res)=>{
    res.render('contact')
});

app.get('/auth/login', loginController);

app.get('/auth/register', creatUserController);

app.listen(4000, () => {
    console.log('App litening on port 4000');
});