import React from 'react';
import { addDecorator } from "@storybook/react";
import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

import StoriesWrapper from 'e-storybook/view/components/stories-wrapper';

addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
	options: {
		showPanel: true,
		showNav: true,
		panelPosition: 'bottom',
	},
});

addDecorator(withKnobs);

export const decorators = [(Story) => {
	const wrapperKnobs = {
		dark: boolean( 'DARK', false ),
		rtl: boolean( 'RTL', false ),
	};

	return <StoriesWrapper { ...wrapperKnobs }><Story/></StoriesWrapper>;
}];
