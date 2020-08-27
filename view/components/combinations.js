import React from 'react';
import PropsCombinations from 'e-storybook/view/utils/props-combinations';

import { select } from "@storybook/addon-knobs";

import CssGrid from 'elementor-app/ui/atoms/css-grid';
import Box from 'elementor-app/ui/atoms/box';
import Text from 'elementor-app/ui/atoms/text';

import './combinations.scss';

const getComponentPropsData = ( combination ) => {
	return (
		<Box className="combinations-info">
			{
				Object.entries( combination ).map( ( data ) => {
					if ( ! [ 'key' ].includes( data[0] ) ) {
						return (
							<Text variant="xs">
								<strong>{ data[0] }</strong>: { data[1] }
							</Text>
						);
					}
				} )
			}
		</Box>
	);
};

export default function Combinations( props ) {
	const Component = props.component,
		componentPropTypes = PropsCombinations.parsePropsObj( Component.__docgenInfo?.props ),
		combinationsPropsArr = Object.keys( componentPropTypes),
		combinationsKey = select( 'Combinations Key', combinationsPropsArr, props.combinationsKey || combinationsPropsArr[ 0 ] ),
		combinationsData = PropsCombinations.get( Component, combinationsKey ),
		gridColumns = combinationsData.propsData ? Object.entries( combinationsData.propsData )[ 0 ][ 1 ].length : 1;

	return (
		<div className="combinations">
			<CssGrid columns={ gridColumns } colMinWidth={50} spacing={0}>
				{ combinationsData.combinations.map( ( combination ) => {
					combination = { ...combination, ...props.defaultProps };

					return (
						<div className="combinations__content">
							<Component { ...combination } />
							{ getComponentPropsData( combination ) }
						</div>
					);
				} ) }
			</CssGrid>
		</div>
	);
};