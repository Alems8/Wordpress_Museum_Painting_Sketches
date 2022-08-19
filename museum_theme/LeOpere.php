<?php
/*Template Name: Le opere*/
get_header();
?>

<div class="content-main">
	<?php
	$page_id = get_queried_object_id();

	$home_query = get_posts(
		array(
			'post_type' => 'attachment',
			'post_mime_type' => 'image',
			'numberposts' => -1,
			'post_status' => null,
			'post_parent' => null
		)
	);

	$query = new WP_Query(
		array(
			'post_type' => 'page',
			'post_parent' => $page_id
		)
	);

	if ($home_query && $query->have_posts()){
		$url = get_page_link($query->post->ID);
		foreach($home_query as $image){
			$query->the_post();
			?>

            <div class="works">
				<?php echo wp_get_attachment_image($image->ID, 'full'); ?>
                <p><?php echo wp_trim_words(get_post($image->ID)->post_content, 20);
					?>
                    <a href="<?php echo $url?>?postID=<?php echo $image->ID; ?>">Continua a leggere</a> </p>
            </div>
			<?php
		}
	}
	?>

</div>


<?php get_footer(); ?>