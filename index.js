const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.set('port', process.env.PORT || 3000)

const articles = [{title: 'Example'}]

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.get('/articles', (req, res, next) => {
    res.send(articles)
})

app.post('/articles', (req, res, next) => {
    // res.send('OK')
    const article = {title: req.body.title}
    articles.push(article)
    res.send(article)
})

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Fetching:', id)
    res.send(articles[id])
})

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Deleting:', id)
    delete articles[id]
    res.send(articles[id])
})

app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'))
})

module.exports = app
