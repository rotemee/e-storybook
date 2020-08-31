module.exports = {
	source: {
		components: {
			directory: '../src/js/ui/',
			alias: 'elementor-app',
			exclude: [
				'text',
				'heading',
				'grid',
				'list',
				'select',
				'select2',
				'menu',
				'css-grid',
				'card',
				'card-header',
				'card-body',
				'card-overlay',
				'card-image',
				'card-footer',
			],
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
			directory: '../auto-components/',
			buildTrigger: 'build-components',
		},
		custom: {
			directory: '../custom-components/',
		}
	},
	examples: {
		directory: '../stories-examples',
		components: {
			path: 'e-storybook/stories-examples/',
		},
	},
};