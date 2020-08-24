const path = require('path');
const fs = require('fs');
const write = require('write');
const eConfig = require('./e-config');
const eUtils = require('./e-utils');

const getComponentRelativePath = ( directoryPath ) => {
	const dirname = __dirname.split( path.sep ).slice(0, -1).join( path.sep ) + path.sep;

	return directoryPath.replace( dirname, '' ).replace( /\\/g, '/' ).replace('src/js', eConfig.source.components.alias);
};

const getExamplesData = ( fileName ) => {
	const isExamplesDataExist = eUtils.isFileExist( path.join(__dirname, eConfig.examples.directory, fileName + '.js') );

	return {
		import: isExamplesDataExist ? `import { examples } from '${ eConfig.examples.components.path + fileName }.js';` : '',
		param: isExamplesDataExist ? `examples: examples,` : '',
	};
};

function getDefaultStoryFolder( directoryPath ) {
	if ( directoryPath.charAt( directoryPath.length-1 ) === path.sep ) {
		directoryPath = directoryPath.slice(0, -1);
	}

	return eUtils.dashCaseToPascalCase( directoryPath.split( path.sep ).pop() );
}

function isCustomStoryExist( fileName ) {
	const storyPath = path.join(__dirname, eConfig.stories.custom.directory, fileName + '.stories.js');

	return eUtils.isFileExist( storyPath );
}

function getStoryBase( fileName, directoryPath, storiesTypes ) {
	const componentName = eUtils.dashCaseToPascalCase( fileName ),
		componentPath = getComponentRelativePath( directoryPath, path.sep ),
		storyFolder = getDefaultStoryFolder( directoryPath, path.sep ),
		examplesData = getExamplesData( fileName );

	return `import { default as Component } from '${ componentPath }${ fileName }';
${ examplesData.import }

export default {
    title: 'UI/${storyFolder}/${ componentName }',
    component: Component,
    parameters: {
        usage: {
            import: "import ${ componentName } from '${ componentPath }${ fileName }'",
            ${ examplesData.param }
        }
    },
};

${ storiesTypes.isDefaultNeeded ? `export * from '../${eConfig.stories.auto.directory}${ fileName }.stories'` : '' }
${ storiesTypes.isCustomExist ? `export * from '../${eConfig.stories.custom.directory}${ fileName }.stories'` : '' }
`;
}

function getDefaultStory( fileName, directoryPath ) {
	const componentPath = getComponentRelativePath( directoryPath );

	return `import React from 'react';
import { default as Component } from '${ componentPath }${ fileName }';
import { storiesConfig } from 'e-storybook/view/stories-config';
import Utils from 'e-storybook/view/stories-utils';

export const Default = () => {
    const propsData = Component.__docgenInfo?.props,
        knobs = {};
    let componentContent;

    if ( propsData ) {
        componentContent = propsData[ 'children' ] ? Utils.parseParenthesis( propsData[ 'children' ].description ) : null;

        for ( const key in propsData ) {
            if ( ! storiesConfig.knobs.props.exclude.includes( key ) ) {
                knobs[ key ] = Utils.getKnob( key, propsData[ key ] );
            }
        }
    }

    return (
        <Component {...knobs}>{ componentContent }</Component>
    );
};
`;
}

function getStoryData( fileName, content, filePath ) {
	return {
		path: path.resolve(__dirname, filePath),
		fileName: fileName + eConfig.stories.fileType,
		content: content,
	};
}

function getDefaultStoryData( fileName, directoryPath ) {
	const storyContent = getDefaultStory( fileName, directoryPath );

	return getStoryData( fileName, storyContent ,eConfig.stories.auto.directory );
}

function getBaseStoryData( fileName, directoryPath, storiesTypes ) {
	const storyContent = getStoryBase( fileName, directoryPath, storiesTypes );

	return getStoryData( fileName, storyContent , eConfig.stories.main.components.directory );
}

function createComponents( directoryPath, relativePath, componentsData ) {
	componentsData = componentsData || [];

	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}

		files.forEach( (file) => {
			if ( eUtils.isDirectory( file ) ) {
				componentsData = createComponents( directoryPath + file + path.sep, file, componentsData );
			} else {
				if ( eUtils.isJSFile( file ) ) {
					const fileName = eUtils.getFileName( file ),
						isDefaultNeeded = ! eConfig.source.components.exclude.includes( fileName ),
						isCustomExist = isCustomStoryExist( fileName );

					if ( isDefaultNeeded ) {
						// Create default story
						const defaultStoryData = getDefaultStoryData( fileName, directoryPath );

						componentsData.push( defaultStoryData );
					}

					if ( isDefaultNeeded || isCustomExist ) {
						// Create base story
						const baseStoryData = getBaseStoryData( fileName, directoryPath, { isDefaultNeeded, isCustomExist } );

						componentsData.push( baseStoryData );
					}
				} else if ( eUtils.isSCSSFile( file ) ) {
					// Empty all scss files content - due to using global css file (app.css).
					write.sync( directoryPath + path.sep + file, '' );
				}
			}
		} );
	});

	return componentsData;
}

module.exports = {
	create: ( processArgv ) => {
		if ( ! processArgv.includes( 'build-stories' ) ) {
			return [];
		}

		const sourceComponentsFolder = path.join(__dirname, eConfig.source.components.directory);

		return createComponents( sourceComponentsFolder );
	},
};