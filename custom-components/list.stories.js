import React from 'react';
import Knobs from 'e-storybook/view/utils/knobs';
import List from 'elementor-app/ui/molecules/list';

import Grid from 'elementor-app/ui/grid/grid';
import Checkbox from 'elementor-app/ui/atoms/checkbox';
import Heading from 'elementor-app/ui/atoms/heading';

const data = [
	{ title: 'Title 1' },
	{ title: 'Title 2' },
	{ title: 'Title 3' },
];

export const Custom = () => {
	const listKnobs = Knobs.getKnobs( List ),
		listItemKnobs = {
			padding: Knobs.createKnob( 'string', 'List Item Padding', '20' ),
		};

	return (
		<List { ...listKnobs }>
			{
				data.map( ( item, index ) => (
					<List.Item { ...listItemKnobs } key={ index }>
						<Grid container>
							<Checkbox style={ { marginInlineEnd: '10px' } } />
							<Heading variant="h3">{ item.title }</Heading>
						</Grid>
					</List.Item>
				) )
			}
		</List>
	);
};