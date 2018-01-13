'use strict';

import { resolve } from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const
    extractSass      = new ExtractTextPlugin( './css/main.scss' ),
    extractAssests   = new CopyWebpackPlugin( [
        {
            from: './assets/',
            to: '../dist/assets/'
        }
    ] ),
    extractHtml      = new HtmlWebpackPlugin( {
        template: 'index.html',
        filename: '../dist/index.html'
    } ),
    includeModules   = new webpack.ProvidePlugin( {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: [ 'popper.js', 'default' ],
        AWS: 'aws-sdk'
    } );

export default {
    context: resolve( __dirname, '../app' ),
    entry: {
        app: [ './js/index.js' ]
    },
    output: {
        path: resolve( __dirname, '../dist/' ),
        filename: 'js/bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loaders: [ 'json-loader' ]
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                        publicPath: './',
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require( 'autoprefixer' )
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|svg|eot)$/,
                use: {
                    loader: 'file-loader?publicPath=../&name=/fonts/[name].[ext]'
                }
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        extractSass,
        extractAssests,
        extractHtml,
        includeModules
    ]
};
