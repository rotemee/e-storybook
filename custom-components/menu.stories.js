import React from 'react';
import Knobs from 'e-storybook/view/utils/knobs';
import Menu from 'elementor-app/ui/menu/menu';
import Button from 'elementor-app/ui/molecules/button';

const data = [
	{
		'type': 'header',
		'icon': 'eicon-header',
		'title': 'Header',
		'page_title': 'Header',
		'page_layout': 'strip',
		'url': '/site-editor/templates/header',
		'urls': {
			'route': '/site-editor/templates/header',
			'create': 'http://localhost/wp/wp-admin/edit.php?action=elementor_new_post&post_type=elementor_library&_wpnonce=ba08571fee&template_type=header',
			'thumbnail': 'http://localhost/wp/wp-content/plugins/elementor/assets/images/app/site-editor/header.svg'
		},
		'tooltip_data': {
			'title': 'What is a Global Header?',
			'content': 'The Global Header allows you to easily design and edit custom WordPress headers so you are no longer constrained by your theme’s header design limitations.',
			'tip': 'You can create multiple headers, and assign each to different areas of your site.',
			'docs': 'https://go.elementor.com/app-theme-builder-header',
			'video_url': 'https://www.youtube.com/embed/tDePkL-1tu4'
		}
	},
	{
		'type': 'footer',
		'icon': 'eicon-footer',
		'title': 'Footer',
		'page_title': 'Footer',
		'page_layout': 'strip',
		'url': '/site-editor/templates/footer',
		'urls': {
			'route': '/site-editor/templates/footer',
			'create': 'http://localhost/wp/wp-admin/edit.php?action=elementor_new_post&post_type=elementor_library&_wpnonce=ba08571fee&template_type=footer',
			'thumbnail': 'http://localhost/wp/wp-content/plugins/elementor/assets/images/app/site-editor/footer.svg'
		},
		'tooltip_data': {
			'title': 'What is a Global Footer?',
			'content': 'The Global Footer allows you to easily design and edit custom WordPress footers without the limits of your theme’s footer design constraints',
			'tip': 'You can create multiple footers, and assign each to different areas of your site.',
			'docs': 'https://go.elementor.com/app-theme-builder-footer',
			'video_url': 'https://www.youtube.com/embed/ob7SMEfVRfc'
		}
	},
	{
		'type': 'single-post',
		'icon': 'eicon-single-post',
		'title': 'Single Post',
		'page_title': 'Single Post',
		'page_layout': 'grid',
		'url': '/site-editor/templates/single-post',
		'urls': {
			'route': '/site-editor/templates/single-post',
			'create': 'http://localhost/wp/wp-admin/edit.php?action=elementor_new_post&post_type=elementor_library&_wpnonce=ba08571fee&template_type=single-post',
			'thumbnail': 'http://localhost/wp/wp-content/plugins/elementor/assets/images/app/site-editor/single-post.svg'
		},
		'tooltip_data': {
			'title': 'What is a Global Post?',
			'content': 'A global post template allows you to easily design the layout and style of posts, ensuring a design consistency throughout all your blog posts, for example.',
			'tip': 'You can create multiple global post templates, and assign each to a different category.',
			'docs': 'https://go.elementor.com/app-theme-builder-post',
			'video_url': 'https://www.youtube.com/embed/KMPVOt_1F2A'
		}
	},
];

const actionButton = () => (
	<Button text={ __( 'Go Pro', 'elementor' ) } hideText icon='eicon-lock' />
);

export const Custom = () => {
	const knobs = Knobs.getKnobs( Menu );

	return (
		<Menu { ...knobs.props } menuItems={ data } actionButton={ actionButton }>
			<div className='eps-menu__title'>
				{ __( 'Site Parts', 'elementor' ) }
			</div>
		</Menu>

	);
};