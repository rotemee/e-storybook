import React from 'react';

import './usage.css';

export default function Usage( props ) {
	const UsageSection = ( innerProps ) => (
		<section className="e-storybook-addon__section">
			{ innerProps.children }
		</section>
	),
	getExamples = () => {
		if ( ! props.examples ) {
			return;
		}

		return (
			<UsageSection>
				{
					props.examples.map( ( example, index ) => (
						<div className="e-storybook-addon__example" key={ index }>
							<h2>{ example.title }</h2>
							<p>{ example.description }</p>
							<pre><code>{ example.code.trim() }</code></pre>
						</div>
					) )
				}
			</UsageSection>
		);
	};


	return (
		<main className="e-storybook-addon">
			<UsageSection>
				{ props.import && <pre><code>{ props.import }</code></pre> }
			</UsageSection>
			{ getExamples() }
		</main>
	);
}