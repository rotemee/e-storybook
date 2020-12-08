import React from 'react';
import Knobs from 'e-storybook/view/utils/knobs';
import Heading from 'elementor-app/ui/atoms/heading';

export const Custom = () => {
	const knobs = Knobs.getKnobs( Heading );

	return <Heading { ...knobs.props }>This is the heading component.</Heading>;
};





