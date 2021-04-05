import React from 'react';
import Knobs from 'e-storybook/view/utils/knobs';
import CssGrid from 'elementor-app/ui/atoms/css-grid';

const data = [
	{ title: 'Title 1', content: 'This is an example text.' },
	{ title: 'Title 2', content: 'This is an example text.' },
	{ title: 'Title 3', content: 'This is an example text.' },
	{ title: 'Title 4', content: 'This is an example text.' },
];

export const Custom = () => {
	const knobs = Knobs.getKnobs( CssGrid );

	return (
		<CssGrid { ...knobs }>
			{
				data.map( ( item ) => (
					<section>
						<h3>{ item.title }</h3>
						<p>{ item.content }</p>
					</section>
				) )
			}
		</CssGrid>

	);
};