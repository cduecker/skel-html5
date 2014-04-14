var _ = require("lodash");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var webpackDevMiddleware = require("webpack-dev-middleware");

var dev_compiler = webpack(_.extend({},webpackConfig,{
	output: {
		path: __dirname + "build/",
		filename: "index.js",
		sourceMapFilename: "[file].source.map"
	},
	devtool: "#source-map"
}));

var devServerMiddleware = webpackDevMiddleware(dev_compiler, {
	noInfo: true,
	quiet: false,

	lazy: false,
	publicPath: "/build/", //this is the middleware matcher path

	watchDelay: 300,

	stats: {
		colors: true
	}
});

module.exports = function (grunt) {
	grunt.initConfig({
		webpack: {
			options: webpackConfig,
			prod: {
				output: {
					path: "build/",
					filename: "index.js"
				},
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						"process.env": {
							"NODE_ENV": JSON.stringify("production")
						}
					}),
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin()
				)
			}
		},
		less: {
			dev: {
				options: {
					ieCompat: false,
					sourceMap: true,
					sourceMapFilename: "build/less.source.map",
					sourceMapUrl: "/build/less.source.map", //Override the default url that points to the sourcemap from the compiled css file.
					sourceMapBasepath: "/resources/less", //Sets the base path for the less file paths in the source map.
					sourceMapRootpath: "/" //Adds this path onto the less file paths in the source map.
				},
				files: {
					"build/index.css": "resources/less/app.less"
				}
			},
			prod: {
				options: {
					ieCompat: false,
					compress: true,
					cleancss: true
				},
				files: {
					"build/index.css": "resources/less/app.less"
				}
			}
		},
		watch: {
			less: {
				files: ['resources/**/*.less'],
				tasks: ['less:dev']
			},
			options: {
				atBegin: true,
				reload: true,
				spawn: false
			}
		},
		connect: {
			server: {
				options: {
					middleware: function (connect, options, middlewares) {

						middlewares.push(devServerMiddleware);

						return middlewares;
					},
					hostname: "localhost",
					port: "8000"
				}
			}
		},
		clean: ['build']
	});

	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean','webpack:prod','less:prod']);
	grunt.registerTask('server', ['clean','connect','watch'])

};