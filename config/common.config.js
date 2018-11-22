const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, "../_build"),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: [
                    path.resolve(__dirname, "../src"),
                ],
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}