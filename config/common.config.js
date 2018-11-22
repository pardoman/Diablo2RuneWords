const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, "../_build"),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}