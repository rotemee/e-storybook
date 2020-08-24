import { addons } from '@storybook/addons';

addons.setConfig({
	previewTabs: {
		canvas: null,
		'storybook/docs/panel': { index: 1, hidden: false },
		'storybook/actions/panel': { disabled: true, hidden: true },
	},
	options: {
		showNav: true,
		showPanel: true,
		panelPosition: 'bottom',
	},
});