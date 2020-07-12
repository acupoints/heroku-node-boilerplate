const path = require('path')
const webpack =require('webpack')

module.exports = {
    entry: './app/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets/',
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                },
                exclude: /node_modules/,
            }
        ]
    }
}