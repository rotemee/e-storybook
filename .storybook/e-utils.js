const fs = require('fs');

module.exports = {
	isDirectory: ( item ) => item.indexOf( '.' ) === -1,
	isJSFile: ( fileName ) => fileName.indexOf( '.js' ) > -1,
	isSCSSFile: ( fileName ) => fileName.indexOf( '.scss' ) > -1,
	isFileExist: ( path ) => fs.existsSync( path ),
	getFileName: ( fileName ) => fileName.split( '.' )[ 0 ],
	dashCaseToPascalCase: ( string ) => ( string.charAt( 0 ).toUpperCase() + string.slice( 1 ) ).replace( /\b-([a-z])/g, ( _, char ) => char.toUpperCase() ),
	dashCaseToCamelCase: ( string ) => string.replace( /\b-([a-z])/g, ( _, char ) => char.toUpperCase() ),
};