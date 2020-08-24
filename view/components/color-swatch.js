import React from 'react';;

import './color-swatch.scss';

export default function ColorSwatch( props ) {
	return (
		<div className="ui-c-color-swatch__item">
			<div className="ui-c-color-swatch__swatch" style={ { '--color-swatch--background-color': props.swatch } }></div>
			<h3 className="ui-c-color-swatch__caption">{ props.title }</h3>
			<h3 className="ui-c-color-swatch__caption">{ props.hex }</h3>
			<h3 className="ui-c-color-swatch__caption">{ props.rgb }</h3>
			<h3 className="ui-c-color-swatch__caption">{ props.hsl }</h3>
			<h3 className="ui-c-color-swatch__caption">{ props.token }</h3>
		</div>
	);
}