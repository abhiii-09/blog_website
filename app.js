var express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

var app = express();
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

//ENDPOINTS
app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.status(200).render('articles/index' , {articles: articles});
});
app.use('/articles', articleRouter);
//STARTING THE SERVER
app.listen('80',function(err){
    if(err){
        console.log('Server Connection Failed!');
    }
    else{
        console.log("Server has started at port 80");
    }
  })
 
