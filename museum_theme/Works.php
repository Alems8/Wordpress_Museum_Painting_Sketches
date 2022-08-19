
<!--
Template Name: Works
-->



<?php get_header(); ?>

<div class="single-work">
	<?php
    $page_id = get_queried_object_id();
	$parent_id = $_GET['postID'];
    ?>

    <h2><?php echo get_post($parent_id)->post_title;?></h2>
    <?php echo wp_get_attachment_image($parent_id, 'full'); ?>
    <div id="work-description">
        <p><b>Descrizione:</b> <?php echo get_post($parent_id)->post_content;?></p>
        <?php

		$query = new WP_Query(
			array(
				'post_type' => 'page',
				'post_parent' => $page_id
			)
		);

		if($query->have_posts()) {
			$query->the_post();
			$url = get_page_link( $query->post->ID );
		?>
        <div id="sketch-button"><button><a href="<?php echo $url?>?postID=<?php echo $parent_id; ?>"><b> Disegna uno sketch</b></a></button></div>
        <?php }?>
    </div>
</div>

<?php get_footer(); ?>
