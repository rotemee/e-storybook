import React, { useEffect } from 'react';

export default function DirectionLtr( props ) {
	useEffect( () => {
		document.querySelector( '[href="app.css"]' ).setAttribute( 'rel', 'stylesheet' );
		document.querySelector( '[href="app-rtl.css"]' ).setAttribute( 'rel', '' );
	}, [] );

	return (
		<>
			{ props.children }
		</>
	);
}