const { createProxyMiddleware } = require('http-proxy-middleware')
require('../public/config')

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/api', {
            target: API_DOMAIN,
            changeOrigin: true,
            secure: false,
            ws: true,
        })
    )
}