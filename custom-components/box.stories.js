import React from 'react';
import Box from 'elementor-app/ui/atoms/box';
import { addDocs } from 'e-storybook/view/components/docs';
import Docs from 'e-storybook/docs/box';

export const Custom = () => (
	<Box padding={40}>Custom Story Content 222</Box>
);

Custom.parameters = {
	docs: addDocs( <Docs /> ),
};





