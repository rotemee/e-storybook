module.exports = {
	source: {
		components: {
			directory: '../src/js/',
			excludeFolders: [ 'utils' ],
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
				'error-boundary',
			],
		},
	},
	stories: {
		fileType: '.stories.js',
		main: {
			components: {
				directory: '../stories/components/',
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