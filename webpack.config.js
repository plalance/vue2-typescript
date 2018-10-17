const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
        entry: ['./src/main.ts', './src/Scss/main.scss'],
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
            // noInfo: true,
            port: 8000
        },
        devtool: "source-map",
        module: {
            rules: [
                // JS Files
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
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }
                    ]
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ]
    }
;

module.exports = config;