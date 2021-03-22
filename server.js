const express = require('express');
const app = express();
const Article = require('./models/article')
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/blog1', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))


app.listen(5000)

app.get('/', async (req, res) => {
  articles = await Article.find().sort({
    createdAt: 'desc'
  })
  res.render('articles/app', {articles: articles })
})

app.use('/articles', articleRouter)

