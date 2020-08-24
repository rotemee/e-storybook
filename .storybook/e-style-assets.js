const path = require("path");

const resources = [
	// Will not work event if comment will be remove, there is also a comment in the webpack.config
	//'../view/assets/css/app.css',
];

module.exports = resources.map( ( file ) => path.resolve( __dirname, file ) );