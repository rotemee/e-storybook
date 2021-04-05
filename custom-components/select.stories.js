import React from 'react';
import Knobs from 'e-storybook/view/utils/knobs';
import Select from 'elementor-app/ui/atoms/select';

const data = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

export const Custom = () => {
	const knobs = Knobs.getKnobs( Select );

	return (
		<Select { ...knobs } options={ data } />
	);
};