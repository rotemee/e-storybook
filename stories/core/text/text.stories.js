import React from 'react';
import Combinations from 'e-storybook/view/components/combinations';

import { default as Component } from 'elementor-app/ui/atoms/text';

export default {
	title: 'Core/Text',
	component: Component,
};

export const Text = () => (
	<Combinations
		component={ Component }
		defaultProps={ { children: 'Example Text' } }
	/>
);