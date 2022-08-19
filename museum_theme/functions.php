<?php
add_theme_support('menus');

register_nav_menus(
	array(
		'primary' => 'Primary Navigation'
	)
);


if(function_exists('add_theme_support')){
	add_theme_support('post-thumbnails');
	set_post_thumbnail_size(150, 150);
}

if(function_exists('add_image_size')){
	add_image_size('work_size', 750, 750);
	add_image_size('post_size', 350, 350);
	add_image_size('sketch_size', 350, 350);
}

function get_thumbnail_correct_size( int $post_thumbnail_id ): string {
	$attachment_src = wp_get_attachment_image_src($post_thumbnail_id);
	$width = $attachment_src[1];
	$height = $attachment_src[2];
	if ($width < $height){
		return 'vertical';
	}
	else{
		return 'horizontal';
	}
}

