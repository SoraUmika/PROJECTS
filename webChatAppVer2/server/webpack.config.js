module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "index.js",
		path: __dirname,
	},

	resolve: {
		extensions: [".ts", ".js", ".json"]
	},

	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			// { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},

	mode: "development",
    target: 'node',
	node: {
		fs: "empty"
	}

};