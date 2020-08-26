import React from 'react';

import Box from 'elementor-app/ui/atoms/box';

//import DirectionLtr from './direction-ltr';
//import DirectionRtl from './direction-rtl';

import '../assets/css/app.css';
import '../assets/lib/eicons/css/elementor-icons.css';
import './stories-wrapper.scss';

export default function StoriesWrapper( props ) {
	//const Direction = props.rtl ? DirectionRtl : DirectionLtr;

	const wrapperProps = {
		className: `e-storybook__stories-wrapper${ props.dark ? ' eps-theme-dark' : '' }`,
	};

	if ( props.rtl ) {
		wrapperProps[ 'dir' ] = 'rtl';
	}

	return (
		<div { ...wrapperProps }>
			<Box padding={ 30 }>
				{ props.children }
			</Box>
		</div>
	);
}