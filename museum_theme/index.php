<?php get_header(); ?>

<div class="content-homepage">
    <?php
        $home_query = new WP_query(
                array(
                        'post_status' => 'publish',
                        'cat' => 4,
                        'post_type' => 'post'

                )
        );
        if ($home_query->have_posts()){
            while($home_query->have_posts()){
                $home_query->the_post();
        ?>
        <h1><?php the_title();?></h1>
        <p><?php the_content();?></p>
        <?php
         }
        }
    ?>

</div>


<?php get_footer(); ?>


