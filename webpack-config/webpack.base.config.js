/**
 * Created by mattputipong on 12/11/17.
 */

'use strict';

import { version, name } from '../package.json';
import { resolve } from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const
	extractHtml    = new HtmlWebpackPlugin( {
		title: name,
		template: 'index.html',
		filename: '../dist/index.html',
		xhtml: true
	} ),
	extractModules = new webpack.ProvidePlugin( {
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
		Popper: [ 'popper.js', 'default' ],
		AWS: 'aws-sdk'
	} ),
	extractAssests = new CopyWebpackPlugin( [
		{
			from: './assets/',
			to: '../dist/assets/'
		}
	] ),
	extractVersion = new webpack.EnvironmentPlugin( {
		VERSION: `v${ version }`
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
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [ 'css-loader', 'sass-loader' ]
				} )
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
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				test: /\.json$/,
				use: {
					loader: 'json-loader'
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin( 'styles.css' ),
		extractHtml,
		extractModules,
		extractAssests,
		extractVersion
	],
	node: {
		dns: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};
