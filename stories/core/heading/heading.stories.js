import React from 'react';
import Combinations from 'e-storybook/view/components/combinations';

import { default as Component } from 'elementor-app/ui/atoms/heading';

export default {
	title: 'Core/Heading',
	component: Component,
};

export const Heading = () => (
	<Combinations
		component={ Component }
		defaultProps={ { children: 'Title' } }
		combinationsKey="color"
	/>
);