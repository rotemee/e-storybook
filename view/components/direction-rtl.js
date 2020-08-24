import React from 'react';

export default function DirectionRtl( props ) {
	import (`../assets/css/app-rtl.css`);

	return (
		<>
			{ props.children }
		</>
	);
}