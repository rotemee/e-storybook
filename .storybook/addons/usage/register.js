import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/api';

import Usage from './usage';

const ADDON_ID = 'usage';
const PANEL_ID = `${ADDON_ID}/panel`;

const getUsage = () => {
	const usageParams = useParameter( 'usage' );

	return <Usage { ...usageParams } />;
};

addons.register(ADDON_ID, (api) => {
	addons.add(PANEL_ID, {
		type: types.PANEL,
		title: 'Usage',
		render: ({ active, key }) => {
			return (
				<AddonPanel active={active} key={key}>
					{ getUsage() }
				</AddonPanel>
			);
		},
	});
});