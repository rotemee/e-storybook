import React from 'react';
import Knobs from 'e-storybook/view/utils/knobs';

import Grid from 'elementor-app/ui/grid/grid';
import Button from 'elementor-app/ui/molecules/button';
import Checkbox from 'elementor-app/ui/atoms/checkbox';
import Heading from 'elementor-app/ui/atoms/heading';
import Text from 'elementor-app/ui/atoms/text';
import Box from 'elementor-app/ui/atoms/box';

export const Custom = () => {
	const gridStyle = {
		maxWidth: '400px',
		margin: '0 auto',
		padding: '10px',
		border: '1px solid lightgrey',
	},
	knobs = Knobs.getKnobs( Grid );

	return (
		<Box padding={ 20 } style={ gridStyle }>
			<Grid { ...knobs.props }>
				<Grid item>
					<Grid item container direction="row">
						<Checkbox style={ { marginRight: '10px' } } />
						<Heading variant="h3">Title</Heading>
					</Grid>

					<Text>This is the description of the item.</Text>
				</Grid>

				<Grid item>
					<Button text="Button" variant="contained" color="cta" />
				</Grid>
			</Grid>
		</Box>
	);
};


