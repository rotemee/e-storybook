import React from 'react';
import './app.scss';

import Box from './ui/atoms/box';
import Checkbox from './ui/atoms/checkbox';

window.__ = (string) => string;

export default function App() {
	return (
		<div>
			<Box>Box Test 1</Box>
			<Checkbox />
		</div>
	);
}
