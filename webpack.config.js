const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const title = '[test] dev';
module.exports = {
	mode: 'development', 
	entry: {
		polyfill: '@babel/polyfill', 
		bulma: 'bulma/bulma.sass', 
		main: './src', 
	}, 
	output: {
		path: path.resolve(__dirname, 'dist'), 
		filename: '[name][hash].js', 
		publicPath: '/', 
	}, 
	plugins: [
		new ExtractTextWebpackPlugin(...[
			'[name][hash].css', 
		]), 
		new CleanWebpackPlugin([
			'dist/*', 
		]), 
		new HtmlWebpackPlugin({
			title, 
		}), 
	], 
	devServer: {
		disableHostCheck: true, 
		historyApiFallback: true, 
	}, 
	module: {
		rules: [
			{
				test: /\.jsx?$/, 
				exclude: /node_modules/, 
				use: [
					{
						loader: 'babel-loader', 
					}, 
				], 
			}, 
			{
				test: /\.(css|s[ac]ss)$/, 
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader', 
					use: [
						{
							loader: 'css-loader', 
						}, 
						{
							loader: 'postcss-loader', 
						}, 
						{
							loader: 'sass-loader', 
						}, 
					], 
				}), 
			}, 
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/, 
				use: [
					{
						loader: 'file-loader', 
						options: {
							name: '[path][name].[ext]', 
						}, 
					}, 
				], 
			}, 
		], 
	}, 
};