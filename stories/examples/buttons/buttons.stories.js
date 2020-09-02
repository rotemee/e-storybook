import React from 'react';
import Combinations from 'e-storybook/view/components/combinations';
import Button from 'elementor-app/ui/molecules/button';

export default {
	title: 'EXAMPLES/Buttons',
	component: Button,
};

export const Buttons = () => (
	<Combinations
		component={ Button }
		defaultProps={ { text: 'Click Here' } }
		combinationsKey="color"
	/>
);