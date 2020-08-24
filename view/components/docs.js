import React from 'react';
import {
	Title,
	Subtitle,
	Description,
	Primary,
	Props,
	Stories,
} from '@storybook/addon-docs/blocks';

export default function DocsContent( props ) {
	return (
		<>
			<Title />
			<Subtitle />
			<Description />
			<Primary />
			<Props />
			<Stories />
			{ props.children }
		</>
	);
}

export function addDocs( component ) {
	return {
		page: () => (
			<DocsContent>
				{ component }
			</DocsContent>
		),
	};
}

