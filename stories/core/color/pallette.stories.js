import React from 'react';
import ColorSwatch from 'e-storybook/view/components/color-swatch';

import CssGrid from 'elementor-app/ui/atoms/css-grid';

export default {
	title: 'Core/Color',
	component: ColorSwatch,
};

const getRootCSSVariable = (styleSheets = document.styleSheets) => {
	var cssVars = [];
	// loop each stylesheet
	for(var i = 0; i < styleSheets.length; i++){
		// loop stylesheet's cssRules
		try{ // try/catch used because 'hasOwnProperty' doesn't work
			for( var j = 0; j < styleSheets[i].cssRules.length; j++){
				try{
					// loop stylesheet's cssRules' style (property names)
					for(var k = 0; k < styleSheets[i].cssRules[j].style.length; k++){
						let name = styleSheets[i].cssRules[j].style[k];
						// test name for css variable signiture and uniqueness
						if(name.startsWith('--') && cssVars.indexOf(name) == -1){
							cssVars.push(name);
						}
					}
				} catch (error) {}
			}
		} catch (error) {}
	}
	return cssVars;
};

const dashCaseToPascalCase = ( string ) => ( string.charAt(0).toUpperCase() + string.slice(1) ).replace( /\b-([a-z])/g, (_, char) => ' ' + char.toUpperCase() );

const colors = getRootCSSVariable().map( ( cssVar ) => {
	return {
		title: dashCaseToPascalCase( cssVar.replace( '--', '' ) ),
		color: `var(${ cssVar })`
	};
} );

export const Pallette = () => (
	<CssGrid columns={5} colMinWidth={50} spacing={0}>
		{
			colors.map( ( swatch, index ) => (
				<ColorSwatch
					key={ index }
					title={ swatch.title }
					swatch={ swatch.color }
				/>
			) )
		}
	</CssGrid>
);