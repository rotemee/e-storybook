import { boolean, number, select, text } from "@storybook/addon-knobs";
import Utils from './utils';
import { storiesConfig } from 'e-storybook/view/stories-config';

export default class Knobs {
	static createKnobFromPropData = ( knobLabel, propData ) => {
		let data = Utils.getPropData( propData );

		if ( data.type ) {
			switch ( data.type ) {
				case 'oneOf':
					const optionsDefaultValue = data.defaultValue.length ? data.defaultValue[ 0 ] : '';

					return select( knobLabel, data.defaultValue, optionsDefaultValue );
				case 'bool':
					return boolean( knobLabel, data.defaultValue );
				case 'number':
					return number( knobLabel, data.defaultValue );
				default:
					return text( knobLabel, data.defaultValue );
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