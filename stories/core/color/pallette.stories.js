import React from 'react';
import ColorSwatch from 'e-storybook/view/components/color-swatch';

import CssGrid from 'elementor-app/ui/atoms/css-grid';

export default {
	title: 'Core/Color',
	component: ColorSwatch,
};

const colors = [
	{
		title: 'Success',
		color: '#39b54a',
	},
	{
		title: 'CTA',
		color: '#93003F',
	},
	{
		title: 'Info',
		color: '#58d0f5',
	},
	{
		title: 'Warning',
		color: '#fcb92c',
	},
	{
		title: 'Danger',
		color: '#b01b1b',
	},
	{
		title: 'Dark',
		color: '#000',
	},
	{
		title: 'Light',
		color: '#fff',
	},
	{
		title: 'Disabled',
		color: '#c2cbd2',
	},
	{
		title: 'Text Muted',
		color: '#d5dadf',
	},
];

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