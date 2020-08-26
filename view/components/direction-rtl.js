import React, { useEffect } from 'react';

export default function DirectionRtl( props ) {
	useEffect( () => {
		document.querySelector( '[href="app.css"]' ).setAttribute( 'rel', '' );
		document.querySelector( '[href="app-rtl.css"]' ).setAttribute( 'rel', 'stylesheet' );
	}, [] );

	return (
		<>
			{ props.children }
		</>
	);
}