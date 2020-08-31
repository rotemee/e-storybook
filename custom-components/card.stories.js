import React from 'react';
import Card from 'elementor-app/ui/card/card';
import CardHeader from 'elementor-app/ui/card/card-header';
import CardBody from 'elementor-app/ui/card/card-body';
import CardImage from 'elementor-app/ui/card/card-image';
import CardOverlay from 'elementor-app/ui/card/card-overlay';
import CardFooter from 'elementor-app/ui/card/card-footer';
import Heading from 'elementor-app/ui/atoms/heading';
import Text from 'elementor-app/ui/atoms/text';
import Grid from 'elementor-app/ui/grid/grid';

export const Custom = () => (
	<div style={ { maxWidth: '250px', width: '50%' } }>
		<Card className="card">
			<CardHeader>
				<Heading variant="h4">Card Header</Heading>
			</CardHeader>
			<CardBody>
				<CardImage alt="Alt Text" src="https://library.elementor.com/wp-content/uploads/2019/10/mm6.png">
					<CardOverlay className="card_overlay">
						<Grid container justify="center" alignItems="center" className="card__content">
							<Text variant="xl">Card Overlay</Text>
						</Grid>
					</CardOverlay>
				</CardImage>
			</CardBody>
			<CardFooter>Card Footer</CardFooter>
		</Card>
	</div>
);