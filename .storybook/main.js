const path = require('path');
const webpack = require('webpack');
const CreateFiles = require('./e-create-files.js');
const eComponentsGenerator = require('./e-components-generator.js');
const eConfig = require('./e-config');
const uiStoriesData = eComponentsGenerator.create( process.argv );

module.exports = {
  stories: [
      '../stories/**/*.stories.(js|mdx)',
      '../auto-components/**/*.stories.(js|mdx)'
  ],
  addons: [
      '@storybook/addon-knobs',
      '@storybook/addon-knobs/register',
      './addons/usage/register.js',
      //'@storybook/addon-actions',
      '@storybook/addon-links',
      {
          name: '@storybook/addon-docs',
          options: {
              configureJSX: true,
              babelOptions: {},
              sourceLoaderOptions: null,
          },
      },
  ],
  webpackFinal: config => {
    config.plugins.push(
        new webpack.ProvidePlugin( {
            React: 'react',
            PropTypes: 'prop-types',
            jQuery: 'jquery',
            __: ['@wordpress/i18n', '__'],
        } ),
        new CreateFiles( uiStoriesData ),
    );

    return config;
  },
};