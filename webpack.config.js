var webpack = require("webpack");

module.exports = {
	cache: true,
	context: __dirname + "/app",
	entry: ["index.js"],
	resolve: {
		alias: {
			"lodash": "lodash/dist/lodash.js",
			"jquery": "jquery/dist/jquery.js",
			"nvd3": "nvd3/nv.d3.js",
			"d3": "d3/d3.js",
			"can": "canjs/amd/can"
		},
		modulesDirectories: ["bower_components", "node_modules", "app"]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/canjs[\/\\]amd/, /^$/),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			can : "can"
		})
	],
	stats: {
		// Configure console output
		colors: true,
		modules: false,
		reasons: false
	},
	failOnError: false, // don't report error to grunt if webpack find errors,
	module: {
		loaders: [
			{
				test: /\.ejs/,
				loader: "transform/cacheable?can.viewify"
			},
			{
				test: /\.mustache/,
				loader: "transform/cacheable?can.viewify"
			}
		]
	}
};
