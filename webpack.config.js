const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let config = {
    entry: './src/main.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: "/dist",
        filename: "main.js"
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue']
    },
    devServer: {
        noInfo: true,
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};

module.exports = config;