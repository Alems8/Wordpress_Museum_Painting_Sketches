<?php

	$data = $_POST['imageUri'];

	$image_rep = str_replace(' ','+', $data);
	$image_uri = base64_decode($image_rep);

	file_put_contents('canvas.png', $image_uri);

	echo 'canvas.png';

