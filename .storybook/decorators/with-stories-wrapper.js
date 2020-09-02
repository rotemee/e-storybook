import React from "react";
import { boolean } from "@storybook/addon-knobs";
import StoriesWrapper from 'e-storybook/view/components/stories-wrapper';

export default function withStoriesWrapper( Story ) {
	/*
		The knobs should be part of the decorator and not inside the StoriesWrapper component:
		Because they need to be added to the component that's being rendered each time.
		Since the pattern is a HOC, the decorator is being rendered each time and not the component itself.
	*/
	const wrapperKnobs = {
		dark: boolean( 'DARK', false ),
		rtl: boolean( 'RTL', false ),
	};

	return (
		<StoriesWrapper { ...wrapperKnobs }>
			<Story />
		</StoriesWrapper>
	);
}