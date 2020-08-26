import React from 'react';

import Box from 'elementor-app/ui/atoms/box';
import CssGrid from 'elementor-app/ui/atoms/css-grid';
import Button from 'elementor-app/ui/molecules/button';
import Text from 'elementor-app/ui/atoms/text';

export default {
	title: 'Core/Buttons',
	component: Button,
};

const getButtonData = ( buttonProps ) => {
	return (
		<div>
			{
				Object.entries( buttonProps ).map( ( data ) => {
					if ( ! [ 'key', 'text' ].includes( data[0] ) ) {
						return ( <Text><strong>{ data[0] }</strong>: { data[1] }</Text> );
					}
				} )
			}
		</div>
	);
}

const getButton = ( buttonProps ) => {
	buttonProps.text = 'TEST';

	return (
		<div style={ { marginBottom: '40px' } }>
			<Button { ...buttonProps } />
			{ getButtonData( buttonProps ) }
		</div>
	);
};

const propsOptions = {
	color: [ 'primary', 'secondary', 'cta', 'link', 'disabled' ],
	variant: [ 'contained', 'underlined', '' ],
	size: [ 'sm', 'md', 'lg' ],
};

const getCombinationsMatrix = ( arr ) => {
	const combinationsArr = [],
		totalIterationsNeeded = arr.map( ( arrItem ) => arrItem.length ).reduce( ( total, length ) => total * length  ),
		indexArr = Array( arr.length ).fill( 0 );

	let combination = [],
		iterationsCount = 0;

	while ( iterationsCount < totalIterationsNeeded ) {
		for ( let i = 0; i < arr.length; i++ ) {
			combination.push( indexArr[ i ] );
		}

		combinationsArr.push( combination );
		combination = [];

		if ( indexArr[ 0 ] < arr[ 0 ].length - 1 ) {
			indexArr[ 0 ]++;
		} else {
			// Manipulating last values of indexArr for the next iteration

			// We need to keep a copy of the indexArr while making changes on the source inside the for loop below
			const currentIndexArr = [ ...indexArr ];

			for ( let i = 1; i <= indexArr.length - 1; i++ ) {
				const isLastValueInArr = currentIndexArr[ i ] === arr[ i ].length - 1;
				const isPreviousArrInLastValue = currentIndexArr[ i - 1 ] === arr[ i - 1 ].length - 1;

				if ( isPreviousArrInLastValue ) {
					if ( isLastValueInArr ) {
						indexArr[ i ] = 0;
					} else {
						indexArr[ i ]++;
					}
				}
			}

			indexArr[ 0 ] = 0;
		}

		iterationsCount++;
	}

	return combinationsArr;
};

const getCombinations = ( dataObj ) => {
	const combinationsArrays = [],
		dataArr = Object.entries( dataObj ),
		objectsArr = [];

	let combinationObj = {};

	dataArr.forEach( ( arr ) => {
		combinationsArrays.push( arr[ 1 ] );
	} );

	let combinations = getCombinationsMatrix( combinationsArrays );

	combinations.forEach( ( combination, index ) => {
		combinationObj[ 'key' ] = index;

		for ( let i = 0; i < combination.length; i++ ) {
			const key = dataArr[ i ][ 0 ];
			const combinationIndex = combination[ i ];
			const dataOptions = dataArr[ i ][1];

			combinationObj[ key ] = dataOptions[ combinationIndex ];
		}

		objectsArr.push( combinationObj );
		combinationObj = {};
	} );

	return objectsArr;
};

const getButtonVariations = () => {
	const buttons = [];
	const combinations = getCombinations( propsOptions );

	combinations.forEach( ( combinationObj ) => {
		buttons.push( getButton( combinationObj ) );
	} );

	return buttons;
};


export const Buttons = () => (
	<Box padding={ 40 }>
		<CssGrid columns={5} colMinWidth={50} spacing={0}>
			{ getButtonVariations() }
		</CssGrid>
	</Box>
);