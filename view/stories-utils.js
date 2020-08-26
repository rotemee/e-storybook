import React from 'react';
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

export default class Utils {
	static parseArray = ( str ) => {
		console.log( 'str', str );
		const arr = str.replace( /\[|]|'| /g, '' ).split( ',' );

		return arr.map( (item) => this.parse( item, true ) );
	};

	static getPropType = ( prop ) => prop.type?.raw.replace( 'PropTypes.', '' ).replace( '.isRequired', '' );

	static parseHTML = ( str ) => {
		const parser = new DOMParser(),
			wrapperClassName = 'e-storybook-parseHTML_wrapper';

		str = `<div class="e-storybook-parseHTML_wrapper">${ str }</div>`;

		let html = parser.parseFromString(str, 'text/html').querySelector( `.${ wrapperClassName } > *` );

		return React.createElement( html.localName, null, html.innerText )
	};

	static parse( str, isArrayItem ) {
		str = str.trim();
		const stringIdentifiers = [ '\'', '\"' ];

		const isArray = str.charAt( 0 ) === '[' && str.charAt( str.length - 1 ) === ']';
		const isInt = /^[0-9]*$/.test( str );
		const isFloat = /^[0-9.]*$/.test( str );
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

		// return Function(`'use strict'; return (${ str })`)();
		return str;
	}s

	static parseParenthesis( content ) {
		const parenthesisContent = content.match( /\((.*?)\)/ );

		if ( parenthesisContent && parenthesisContent.length ) {
			return this.parse( parenthesisContent[ 1 ] );
		}

		return '';
	}

	static getKnob = ( knobLabel, propData ) => {
		let propType = this.getPropType( propData );

		if ( propType ) {
			let	isPropTypeArray = propType.indexOf( '[' ) > -1 && propType.indexOf( 'PropTypes.' ) === -1,
				parenthesisContent = isPropTypeArray ? propType : propData.description,
				knobOptions = this.parseParenthesis( parenthesisContent ),
				defaultValue;

			if ( propType.indexOf( 'oneOf(' ) > -1 ) {
				defaultValue = knobOptions.length ? knobOptions[ 0 ] : '';
				propType = 'oneOf';
			}

			switch ( propType ) {
				case 'oneOf':
					return select( knobLabel, knobOptions, defaultValue );
					break;
				case 'bool':
					return boolean( knobLabel, false );
					break;
				case 'number':
					return number( knobLabel, knobOptions );
					break;
				default:
					return text( knobLabel, knobOptions );
			}
		}
	}

	static getWrapperKnobs = () => {
		return {
			dark: boolean( 'DARK', false ),
			rtl: boolean( 'RTL', false ),
		};
	}
}