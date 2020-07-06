const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const Article = require('./db').Article
// const read = require('node-readability')

// const articles = [{title: 'Example'}]

app.set('port', process.env.PORT || 3000)


const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))


app.use(
    '/css/bootstrap.css',
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
    )
    
app.get('/', (req, res) => {
    res.send('Hello3')
})
app.get('/articles', (req, res, next) => {
    // res.send(articles)
    Article.all((err, articles) => {
        if (err) return next(err)
        // res.send(articles)
        res.render('articles', {articles: articles})
    })
})

app.post('/articles', (req, res, next) => {
    // res.send('OK')
    // const article = {title: req.body.title}
    // articles.push(article)
    // res.send(article)
    const url = req.body.url

    // read(url, (err, result) => {
    //     if (err || !result) res.status(500).send('Error downloading article')
    //     Article.create(
    //         {title: result.title, content: result.content},
    //         (err, article) => {
    //             if (err) return next(err)
    //             res.send('OK')
    //         }
    //     )
    // })
})

app.get('/articles/:id', (req, res, next) => {
    // const id = req.params.id
    // console.log('Fetching:', id)
    // res.send(articles[id])
    const id = req.params.id
    Article.find(id, (err, article) => {
        if (err) return next(err)
        res.send(article)
    })
})

app.delete('/articles/:id', (req, res, next) => {
    // const id = req.params.id
    // console.log('Deleting:', id)
    // delete articles[id]
    // res.send(articles[id])
    const id = req.params.id
    Article.delete(id, (err) => {
        if (err) return next(err)
        res.send({message: 'Deleted'})
    })
})

app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'))
})

module.exports = app
