import { boolean, number, select, text } from "@storybook/addon-knobs";
import Utils from './utils';
import { storiesConfig } from 'e-storybook/view/stories-config';

export default class Knobs {
	/**
	 @example: Knobs.createKnob( 'string', 'List Item Padding', '20' )
	 */
	static createKnob = ( type, label, defaultValue, optionsDefaultValue ) => {
		defaultValue = this.parseTranslationFunction( defaultValue );

		switch ( type ) {
			case 'bool':
				return boolean( label, defaultValue );
			case 'number':
				return number( label, defaultValue );
			case 'select':
				return select( label, defaultValue, optionsDefaultValue );
			case 'string':
			case 'oneOfType':
			case 'any':
				return text( label, defaultValue );
			default:
				return null;
		}
	}

	static parseTranslationFunction = ( value ) => {
		if ( 'string' === typeof value && value.indexOf( '__(' ) > -1 ) {
			value = value.replace( /[_()]/g, '' ).split( ',' )[ 0 ];
			value = Utils.parse( value );
		}

		return value;
	}

	static createKnobFromPropData = ( knobLabel, propData, propName, defaultValue ) => {
		let data = Utils.getPropData( propData, propName );
		const customDefaultValue = defaultValue || data.defaultValue;

		if ( data.type ) {
			if ( 'oneOf' === data.type ) {
				const optionsDefaultValue = propData.defaultValue ? Utils.parse( propData.defaultValue.value ) : data.defaultValue[ 0 ];

				return this.createKnob( 'select', knobLabel, data.defaultValue, defaultValue || optionsDefaultValue );
			} else {
				return this.createKnob( data.type, knobLabel, customDefaultValue );
			}
		}
	}

	static getKnobs( Component, defaultProps, labelPrefix ) {
		const propsData = Component.__docgenInfo?.props,
			propsKnobs = {};

		if ( propsData ) {
			for ( const key in propsData ) {
				if ( ! storiesConfig.knobs.props.exclude.includes( key ) ) {
					let defaultPropValue = defaultProps?.hasOwnProperty( key ) ? defaultProps[ key ] : null,
						knobLabelPrefix = labelPrefix || Component.__docgenInfo?.displayName;

					knobLabelPrefix = knobLabelPrefix ? knobLabelPrefix + ' - ' : '';

					const knobLabel = knobLabelPrefix + Utils.camelCaseToSpacedPascalCase( key );

					propsKnobs[ key ] = this.createKnobFromPropData( knobLabel, propsData[ key ], key, defaultPropValue );
				}
			}
		}

		return propsKnobs;
	}
}