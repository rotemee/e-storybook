import React from 'react';
import { addDecorator } from "@storybook/react";
import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withKnobs } from "@storybook/addon-knobs";

import withStoriesWrapper from 'e-storybook/.storybook/decorators/with-stories-wrapper';

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

addDecorator( withKnobs );
addDecorator( withStoriesWrapper);
