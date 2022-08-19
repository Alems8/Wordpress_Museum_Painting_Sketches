<!DOCTYPE html>
<html lang="it">
<head>
	<meta charset="UTF-8">
	<title><?php bloginfo('name');?></title>
	<meta name="description" content="<?php bloginfo('description');?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<link href="<?php bloginfo('template_url')?>/CSS/style.css" rel="stylesheet" type="text/css">
	<script src="<?php bloginfo('template_url')?> /JS/drawing-desktop-mobile.js" type="text/javascript"></script>
    <script src="<?php bloginfo('template_url')?> /JS/style-script.js" type="text/javascript"></script>
	<?php wp_head(); ?>
</head>
<body>
<header id="museum-header">
	<div class="title">
		<h1>Gli Uffizi</h1>
	</div>
	<nav>
		<?php
		if (has_nav_menu('primary')){
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'menu_class' => 'menu-primary'
				)
			);
		}
		?>

	</nav>
</header>
