import React from 'react';

export default class Utils {
	static parseArray = ( str ) => {
		const arr = str.replace( /\[|]|'| /g, '' ).split( ',' );

		return arr.map( (item) => this.parse( item, true ) );
	};

	static getPropType = ( prop ) => prop.type?.raw.replace( 'PropTypes.', '' ).replace( '.isRequired', '' );

	static getPropData = ( propData ) => {
		let propType = this.getPropType( propData );

		if ( propType ) {
			let isPropTypeArray = propType.indexOf( '[' ) > -1 && propType.indexOf( 'PropTypes.' ) === -1,
				parenthesisContent = isPropTypeArray ? propType : propData.description,
				defaultValue = Utils.parseParenthesis( parenthesisContent );

			if ( propType.indexOf( 'oneOf(' ) > -1 ) {
				propType = 'oneOf';
			}

			return {
				type: propType,
				defaultValue: defaultValue,
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
			console.log( 'This is a float' );
			return parseFloat( str );
		} else if ( isInt ) {
			console.log( 'This is an int' );
			return parseInt( str );
		} else if ( isTrue ) {
			console.log( 'This is true' );
			return true;
		} else if ( isFalse ) {
			console.log( 'This is false' );
			return false;
		} else if ( isHTML ) {
			console.log( 'This is html' );
			return this.parseHTML( str );
		}  else if ( isString ) {
			console.log( 'This is a string' );
			return str.replace( /['"]/g, '' );
		}

		// Considering: this line can replace all the cope above and to parse according the type automatically
		// return Function(`'use strict'; return (${ str })`)();
		return str;
	}

	static parseParenthesis( content ) {
		const parenthesisContent = content.match( /\((.*?)\)/ );

		if ( parenthesisContent && parenthesisContent.length ) {
			return this.parse( parenthesisContent[ 1 ] );
		}

		return '';
	}
}