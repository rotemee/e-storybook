import React from 'react';
import Combinations from 'e-storybook/view/components/combinations';

import Text from 'elementor-app/ui/atoms/text';
import Heading from 'elementor-app/ui/atoms/heading';
import CssGrid from 'elementor-app/ui/atoms/css-grid';

export default {
	title: 'Base/Typography',
};

export const Typography = () => (
	<CssGrid columns={ 2 } colMinWidth={ 50 }>
		<Combinations
			component={ Heading }
			defaultProps={ { children: 'Heading' } }
			columns={ 1 }
		/>
		<Combinations
			component={ Text }
			defaultProps={ { children: 'Text' } }
			columns={ 1 }
		/>
	</CssGrid>
);