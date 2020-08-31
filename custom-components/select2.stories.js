import React from 'react';
import Select2 from 'elementor-app/ui/molecules/select2';

const data = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

export const Custom = () => {
	return (
		<Select2
			multiple
			options={ data }
			settings={ {
				width: '100%',
				containerCssClass: 'select2',
				placeholder: __( 'Select custom post types (maximum of 20 posts will be included)', 'elementor' ),
			} }
		/>
	);
};