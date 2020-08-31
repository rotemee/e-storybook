import { boolean, number, select, text } from "@storybook/addon-knobs";
import Utils from './utils';
import { storiesConfig } from 'e-storybook/view/stories-config';

export default class Knobs {
	/**
	 @example: Knobs.createKnob( 'string', 'List Item Padding', '20' )
	 */
	static createKnob = ( type, label, defaultValue, optionsDefaultValue ) => {
		switch ( type ) {
			case 'bool':
				return boolean( label, defaultValue );
			case 'number':
				return number( label, defaultValue );
			case 'select':
				console.log( label, defaultValue, optionsDefaultValue );
				return select( label, defaultValue, optionsDefaultValue );
			case 'string':
				return text( label, defaultValue );
			default:
				return null;
		}
	}

	static createKnobFromPropData = ( knobLabel, propData, defaultValue ) => {
		let data = Utils.getPropData( propData );
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

	static getKnobs( Component, defaultProps ) {
		const propsData = Component.__docgenInfo?.props,
			componentChildren = propsData[ 'children' ] ? Utils.parseParenthesis( propsData[ 'children' ].description ) : null,
			propsKnobs = {};

		console.log( 'Component.__docgenInfo', Component.__docgenInfo );

		if ( propsData ) {
			for ( const key in propsData ) {
				if ( ! storiesConfig.knobs.props.exclude.includes( key ) ) {
					const defaultPropValue = defaultProps?.hasOwnProperty( key ) ? defaultProps[ key ] : null,
						knobLabelPrefix = Component.__docgenInfo?.displayName + '_' || '';

					propsKnobs[ key ] = this.createKnobFromPropData( knobLabelPrefix + key, propsData[ key ], defaultPropValue );
				}
			}
		}

		return {
			props: propsKnobs,
			children: componentChildren,
		};
	}
}