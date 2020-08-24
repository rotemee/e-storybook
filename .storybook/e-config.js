const path = require('path');

module.exports = {
	source: {
		components: {
			directory: '../src/js/ui/',
			alias: 'elementor-app',
			exclude: [ 'text', 'heading', 'grid' ],
		},
	},
	stories: {
		fileType: '.stories.js',
		main: {
			components: {
				directory: '../stories/ui/',
			},
		},
		auto: {
			directory: '../auto-stories/',
		},
		custom: {
			directory: '../custom-stories/',
		}
	},
	examples: {
		directory: '../stories-examples',
		components: {
			path: 'e-storybook/stories-examples/',
		},
	},
};