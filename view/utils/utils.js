import React from 'react';

export default class Utils {
	static parseArray = ( str ) => {
		const arr = str.replace( /\[|]|'| /g, '' ).split( ',' );

		return arr.map( (item) => this.parse( item, true ) );
	};

	static camelCaseToSpacedPascalCase = ( string ) => {
		string = string.replace( /([A-Z])/g, (_, char) => ' ' + char );

		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	static dashCaseToSpacesPascalCase = ( string ) => {
		string = string.charAt(0).toUpperCase() + string.slice(1);

		return string.replace( /\b-([a-z])/g, (_, char) => ' ' + char.toUpperCase() );
	};

	static getPropFallbackValue = ( propType, isRequired ) => {
		switch (  propType ) {
			case 'bool':
				return false;
			case 'number':
				return 0;
			case 'string':
				return isRequired ? 'EXAMPLE TEXT' : '';
			default:
				return null;
		}
	}

	static getPropData = ( propData ) => {
		const isRequired = propData.type?.raw.indexOf( '.isRequired' ) > -1
		let propType = propData.type?.raw.replace( 'PropTypes.', '' ).replace( '.isRequired', '' );

		if ( propType ) {
			let isPropTypeArray = propType.indexOf( '[' ) > -1 && propType.indexOf( 'PropTypes.' ) === -1,
				defaultValue;

			if ( isPropTypeArray ) {
				defaultValue = this.parseParenthesis( propType );
			} else if ( propData.defaultValue ) {
				defaultValue = this.parse( propData.defaultValue.value );
			} else {
				defaultValue = Utils.parseJSDocsExample( propData.description );
			}

			if ( propType.indexOf( 'oneOf(' ) > -1 ) {
				propType = 'oneOf';
			}

			return {
				type: propType,
				defaultValue: defaultValue || this.getPropFallbackValue( propType, isRequired ),
				description: propData.description,
			};
		}

		return {};
	};

	static parseHTML = ( str ) => {
		const parser = new DOMParser(),
			wrapperClassName = 'e-storybook-parseHTML_wrapper';

		str = `<div class="e-storybook-parseHTML_wrapper">${ str }</div>`;

		let html = parser.parseFromString(str, 'text/html').querySelector( `.${ wrapperClassName } > *` );

		return React.createElement( html.localName, null, html.innerText )
	};

	static parse( str ) {
		str = str.trim();
		const stringIdentifiers = [ '\'', '\"' ];

		const isArray = str.charAt( 0 ) === '[' && str.charAt( str.length - 1 ) === ']';
		const isInt = Number.isInteger( parseInt( str ) );
		const isFloat = parseFloat( str ) === str && parseFloat( str ) % 1 !== 0;
		const isTrue = 'true' === str;
		const isFalse = 'false' === str;
		const isHTML = str.charAt( 0 ) === '<' && str.charAt( str.length - 1 ) === '>';
		const isString = ( stringIdentifiers.includes( str.charAt( 0 ) ) && stringIdentifiers.includes( str.charAt( str.length - 1 ) ) );

		if ( isArray ) {
			return this.parseArray( str );
		} else if ( isFloat ) {
			return parseFloat( str );
		} else if ( isInt ) {
			return parseInt( str );
		} else if ( isTrue ) {
			return true;
		} else if ( isFalse ) {
			return false;
		} else if ( isHTML ) {
			return this.parseHTML( str );
		}  else if ( isString ) {
			return str.replace( /['"]/g, '' );
		}

		// Considering: this line can replace all the cope above and to parse according the type automatically
		// return Function(`'use strict'; return (${ str })`)();
		return str;
	}

	static parseJSDocsExample( content ) {
		const exampleContent = content.match( /@example(.*)\((.*?)\)(.*?)/ );

		return exampleContent && exampleContent.length ? this.parseParenthesis( exampleContent[ 0 ] ) : '';
	}

	static parseParenthesis( content ) {
		const parenthesisContent = content.match( /\((.*?)\)/ );

		if ( parenthesisContent && parenthesisContent.length ) {
			return this.parse( parenthesisContent[ 1 ] );
		}

		return '';
	}
}