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
				return select( label, defaultValue, optionsDefaultValue );
			case 'string':
				return text( label, defaultValue );
			default:
				return null;
		}
	}

	static createKnobFromPropData = ( knobLabel, propData ) => {
		let data = Utils.getPropData( propData );

		if ( data.type ) {
			if ( 'oneOf' === data.type ) {
				const optionsDefaultValue = propData.defaultValue ? Utils.parse( propData.defaultValue.value ) : data.defaultValue[ 0 ];

				return this.createKnob( 'select', knobLabel, data.defaultValue, optionsDefaultValue );
			} else {
				return this.createKnob( data.type, knobLabel, data.defaultValue );
			}
		}
	}

	static getKnobs( Component ) {
		const propsData = Component.__docgenInfo?.props,
			componentChildren = propsData[ 'children' ] ? Utils.parseParenthesis( propsData[ 'children' ].description ) : null,
			propsKnobs = {};

		if ( propsData ) {
			for ( const key in propsData ) {
				if ( ! storiesConfig.knobs.props.exclude.includes( key ) ) {
					propsKnobs[ key ] = this.createKnobFromPropData( key, propsData[ key ] );
				}
			}
		}

		return {
			props: propsKnobs,
			children: componentChildren,
		};
	}
}