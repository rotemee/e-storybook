import React from 'react';
import Grid from 'elementor-app/ui/grid/grid';

import Button from 'elementor-app/ui/molecules/button';
import Checkbox from 'elementor-app/ui/atoms/checkbox';
import Heading from 'elementor-app/ui/atoms/heading';
import Text from 'elementor-app/ui/atoms/text';

export const Custom = () => (
	<section style={ { maxWidth: '400px', margin: '0 auto', padding: '10px', border: '1px solid lightgrey' } }>
		<Grid container justify="space-between" alignItems="center">
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
	</section>
);


