import React from "react";
import { boolean } from "@storybook/addon-knobs";
import StoriesWrapper from 'e-storybook/view/components/stories-wrapper';

export default function withStoriesWrapper(Story ) {
	const wrapperKnobs = {
		dark: boolean( 'DARK', false ),
		rtl: boolean( 'RTL', false ),
	};

	return <StoriesWrapper { ...wrapperKnobs }><Story /></StoriesWrapper>;
}