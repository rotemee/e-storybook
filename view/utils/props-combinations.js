import Utils from './utils';

export default class PropsCombinations {
	static getCombinationsMatrix( arr ) {
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

	static getCombinationsObjects( dataObj ) {
		const combinationsArrays = [],
			dataArr = Object.entries( dataObj ),
			objectsArr = [];

		let combinationObj = {};

		dataArr.forEach( ( arr ) => {
			combinationsArrays.push( arr[ 1 ] );
		} );

		let combinations = this.getCombinationsMatrix( combinationsArrays );

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
	}

	static sortPropsObj( propsObj, combinationsKey ) {
		const entries = [];

		// If combinationsKey exist we put it first
		if ( propsObj.hasOwnProperty( combinationsKey ) ) {
			entries.push( [ combinationsKey, propsObj[ combinationsKey ] ] );
		}

		// Adding the rest of the props to the entries
		for ( const key in propsObj ) {
			if ( key !== combinationsKey ) {
				entries.push( [ key, propsObj[ key ] ] );
			}
		}

		return Object.fromEntries( entries );
	}

	static parsePropsObj( propsData, combinationsKey ) {
		let propsObj = {};

		for ( const prop in propsData ) {
			const propData = Utils.getPropData( propsData[ prop ] );

			if ( 'oneOf' === propData.type ) {
				propsObj[ prop ] = propData.defaultValue;
			}
		}

		return this.sortPropsObj( propsObj, combinationsKey );
	}

	static get( Component, combinationsKey = '' ) {
		const propsData = Component.__docgenInfo?.props;

		if ( ! propsData ) {
			return {};
		}

		const parsedPropsObj = this.parsePropsObj( propsData, combinationsKey );

		return {
			combinations: this.getCombinationsObjects( parsedPropsObj ),
			propsData: parsedPropsObj,
		};
	}
}
