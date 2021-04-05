import React from 'react';
import Knobs from 'e-storybook/view/utils/knobs';
import Card from 'elementor-app/ui/card/card';
import CardHeader from 'elementor-app/ui/card/card-header';
import CardBody from 'elementor-app/ui/card/card-body';
import CardImage from 'elementor-app/ui/card/card-image';
import CardOverlay from 'elementor-app/ui/card/card-overlay';
import CardFooter from 'elementor-app/ui/card/card-footer';
import Text from 'elementor-app/ui/atoms/text';;
import CssGrid from 'elementor-app/ui/atoms/css-grid';
import Grid from 'elementor-app/ui/grid/grid';

import './cards.scss';

export default {
	title: 'EXAMPLES/Cards',
	component: Card,
};

const cardsData = [
	{ title: 'Template 1', imageUrl: 'https://library.elementor.com/wp-content/uploads/2020/08/About.png', footer: 'Flooring Company – About - page' },
	{ title: 'Template 2', imageUrl: 'https://library.elementor.com/wp-content/uploads/2017/03/lp2-l.png', footer: 'Landing Page – Hotel - page' },
	{ title: 'Template 3', imageUrl: 'https://library.elementor.com/wp-content/uploads/2016/08/0016.png', footer: 'Homepage – Restaurant - page' },
	{ title: 'Template 4', imageUrl: 'https://library.elementor.com/wp-content/uploads/2016/10/0022.png', footer: 'Homepage – Study - page' },
	{ title: 'Template 5', imageUrl: 'https://library.elementor.com/wp-content/uploads/2016/08/0019.png', footer: 'Homepage – Agency - page' },
	{ title: 'Template 6', imageUrl: 'https://library.elementor.com/wp-content/uploads/2020/06/Home-Page.jpg', footer: 'Japanese restaurant – Home - page' },
	{ title: 'Template 7', imageUrl: 'https://library.elementor.com/wp-content/uploads/2016/08/0003.png', footer: 'Product – App - page' },
	{ title: 'Template 8', imageUrl: 'https://library.elementor.com/wp-content/uploads/2020/05/Contact-Us-Page.jpg', footer: 'Barbershop – Contact - page' },
	{ title: 'Template 9', imageUrl: 'https://library.elementor.com/wp-content/uploads/2019/09/About_small.png', footer: 'Portfolio – About - page' },
	{ title: 'Template 10', imageUrl: 'https://library.elementor.com/wp-content/uploads/2019/07/Contsct-Us_small.png', footer: 'Digital Agency – Contact - page' },
	{ title: 'Template 11', imageUrl: 'https://library.elementor.com/wp-content/uploads/2019/08/About_Small.png', footer: 'Gym – About - page' },
	{ title: 'Template 12', imageUrl: 'https://library.elementor.com/wp-content/uploads/2016/10/0023.png', footer: 'Homepage – Fitness - page' },
	{ title: 'Template 13', imageUrl: 'https://library.elementor.com/wp-content/uploads/2016/10/0021.png', footer: 'Landing Page – Vacation - page' },
	{ title: 'Template 14', imageUrl: 'https://library.elementor.com/wp-content/uploads/2017/02/Landing-Page-Personal-Trainer.png', footer: 'Landing Page – Personal Trainer - page' },
	{ title: 'Template 15', imageUrl: 'https://library.elementor.com/wp-content/uploads/2018/11/conference-250.png', footer: 'Landing Page – Conference 5 - page' },
];

const getCard = ( title, imageUrl, footer, index ) => (
	<Card className="card" key={ index }>
		<CardBody>
			<CardImage alt="Alt Text" src={ imageUrl }>
				<CardOverlay className="promotion-overlay">
					<Grid container justify="center" alignItems="center" className="card__content">
						<Text>
							<i className="eicon-zoom-in-bold" />
						</Text>
					</Grid>
				</CardOverlay>
			</CardImage>
		</CardBody>
		<CardFooter>
			<Text variant="xs">{ footer }</Text>
		</CardFooter>
	</Card>
);

const knobsDefaultValues = {
	columns: 5,
	colMinWidth: 100,
	colMaxWidth: 200,
	spacing: 30,
};

export const Cards = () => {
	const knobs = Knobs.getKnobs( CssGrid, knobsDefaultValues );

	return (
		<Grid container justify="center">
			<CssGrid { ...knobs }>
				{
					cardsData.map( ( card, index ) => getCard( card.title, card.imageUrl, card.footer, index) )
				}
			</CssGrid>
		</Grid>
	);
};