const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build') 
};

const TARGET = process.env.npm_lifecycle_event;
const DEBUG = true;

var common = {
	entry: {
		app: [path.join(PATHS.app, '/app.js')],
		index: [path.join(PATHS.app, '/features/index/index.controller')],
		list: [path.join(PATHS.app, '/features/list/list.controller')]
	},
    output: {
	    path: PATHS.build,
	    // publicPath: PATHS.build,
	    filename: DEBUG ? '[name].js' : '[name].[hash].js',
	    chunkFilename: '[id].bundle.js'
	},
    module: {
    	loaders: [
	    	{
	    		test: /\.js$/,
	    		exclude: /node_modules/,
	    		loader: 'babel-loader'
	    	},
	    	{
		        // HTML LOADER
		        // Reference: https://github.com/webpack/raw-loader
		        // Allow loading html through js
		        test: /\.html$/,
		        loader: 'raw-loader'
		    }
    	]
    },
    plugins: [
	    new HtmlwebpackPlugin({
	    	// required
	    	inject: false,
	      	// template: require('html-webpack-template'),
	      	template: path.join(PATHS.app, '/index.ejs'),
	      	
	      	// optional
	      	// appMountId: 'app',
	      	// baseHref: 'http://localhost:8080',
	      	// devServer: 3080,
	      	googleAnalytics: {
	      		trackingId: 'UA-XXXX-XX',
	      		pageViewOnLoad: true
	      	},
	      	filename: path.join(PATHS.build, '/index.html'),
	      	mobile: true,
	      	title: 'Angular1.x with ES6',
	      	window: {
	      		env: {
	      			apiHost: 'http://127.0.0.1:3012'
	      		}
	      	},
	      	chunks: ['common', 'app']
	    }),
	    // new webpack.optimize.CommonsChunkPlugin('vendors', DEBUG ? 'vendors.js' : 'vendors.[hash].js'),
	    // new webpack.optimize.CommonsChunkPlugin('jquery', DEBUG ? 'jquery.js' : 'jquery.[hash].js'),
	    new webpack.optimize.CommonsChunkPlugin({
	      name: 'common',
	      chunks: ['app', 'index', 'list'],
	      minChunks: 2
	    }),
	    // new webpack.optimize.CommonsChunkPlugin({
	    //   names: [ 'jquery', 'vendors']
	    // }),
	    new webpack.optimize.UglifyJsPlugin({
	               sourceMap: true,
	               mangle: false
	    }),
	    // new webpack.ProvidePlugin({
	    //   $: "jquery",
	    //   jQuery: "jquery",
	    //   "window.jQuery": "jquery"
	    // }),
	    // new ExtractTextPlugin("[name].css")
    ]
};
console.log(TARGET);
if (TARGET === 'start' || !TARGET) {
	common.entry.app.unshift("webpack-dev-server/client?http://localhost:8091/", "webpack/hot/dev-server");
	common = merge(common, {
		devServer: {
			contentBase: PATHS.build,
			historyApiFallback: true,
		    hot: true,
		    inline: false,
		    progress: true,
		    // Display only errors to reduce the amount of output.
      		stats: 'errors-only',

      		// Parse host and port from env so this is easy to customize.
      		host: process.env.HOST,
      		port: '8091' //process.env.PORT
		},
		devtools: 'eval-source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}
console.log(common.devServer);

module.exports = common;