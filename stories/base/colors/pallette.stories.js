import React from 'react';
import ColorSwatch from 'e-storybook/view/components/color-swatch';
import Utils from 'e-storybook/view/utils/utils';

import CssGrid from 'elementor-app/ui/atoms/css-grid';

export default {
	title: 'Base/Color',
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


// This solution is pending for move all components CSS vars declarations from :root to the components level
const colorsPending = getRootCSSVariable().map( ( cssVar ) => {
	return {
		title: Utils.dashCaseToSpacesPascalCase( cssVar.replace( '--', '' ) ),
		color: `var(${ cssVar })`
	};
} );

const colors = [
	{ title: 'green-spandex', color: '#39b54a' },
	{ title: 'yellow-hot-sun', color: '#fcb92c' },
	{ title: 'red-tomato-frog', color: '#F84343' },
	{ title: 'red-carnelian', color: '#b01b1b' },
	{ title: 'red-rose-garnet', color: '#93003F' },
	{ title: 'cyan-ionized-air-glow', color: '#58d0f5' },
	{ title: 'black', color: '#000' },
	{ title: 'white', color: '#fff' },
];

const grays = [
	{ title: 'gray-anthracite', color: '#26292C' },
	{ title: 'gray-metalise', color: '#34383c' },
	{ title: 'gray-napoleon', color: '#404349' },
	{ title: 'gray-lamp-post', color: '#495157' },
	{ title: 'gray-abbey', color: '#4c4f56' },
	{ title: 'gray-blue-planet', color: '#556068' },
	{ title: 'gray-stone-hearth', color: '#64666a' },
	{ title: 'gray-sheffield', color: '#6d7882' },
	{ title: 'gray-silver-filigree', color: '#7d7e82' },
	{ title: 'gray-special-delivery', color: '#a4afb7' },
	{ title: 'gray-brainstem', color: '#b4b5b7' },
	{ title: 'gray-stone-golem', color: '#c2cbd2' },
	{ title: 'gray-hidden-creek', color: '#d5dadf' },
	{ title: 'gray-yin-bai-silver', color: '#e0e1e3' },
	{ title: 'gray-anti-flash', color: '#f1f3f5' },
	{ title: 'gray-emptiness', color: '#fcfcfc' },
];

export const Pallette = () => (
	<>
		<section>
			<h1>Colors</h1>
			<CssGrid columns={4} colMinWidth={50} spacing={0}>
				{
					colors.map( ( swatch, index ) => (
						<ColorSwatch
							key={ index }
							title={ Utils.dashCaseToSpacesPascalCase( swatch.title ) }
							swatch={ swatch.color }
						/>
					) )
				}
			</CssGrid>
		</section>
		<section>
			<h1>Grays</h1>
			<CssGrid columns={4} colMinWidth={50} spacing={0}>
				{
					grays.map( ( swatch, index ) => (
						<ColorSwatch
							key={ index }
							title={ Utils.dashCaseToSpacesPascalCase( swatch.title ) }
							swatch={ swatch.color }
						/>
					) )
				}
			</CssGrid>
		</section>
	</>
);