const path = require('path');

module.exports = {
	entry: [ './src/client/client.js' ],
	output: {
		filename: 'client_bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build'
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
				options: {
					presets: [
						'react',
						'stage-0',
						[
							'env',
							{
								target: { browsers: [ 'last 2 versions' ] }
							}
						]
					]
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].min.css',
							outputPath: 'assets/css/'
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							url: true
						}
					}
				]
			}
		]
	}
};
