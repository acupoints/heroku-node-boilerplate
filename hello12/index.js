// const app = require('connect')()

// app.use((req, res, next) => {
//     res.end('Hello, world!')
// })

// app.listen(3000)

const connect = require('connect')

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url)
    next()
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world')
}

// connect()
//     .use(logger)
//     .user(hello)
//     .listen(3000)
const app = connect()
app.use(logger)
app.use(hello)
app.listen(3000)
