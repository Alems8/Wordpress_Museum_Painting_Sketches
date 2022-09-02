<!--
Template Name: Sketch
-->

<?php get_header();?>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v14.0" nonce="qE2VWDqw"></script>

<div id="main-sketch-container" class="sketch">
    <div id="sketch-container">
        <div id="canvas-container"><canvas id="areaDiDisegno" tabindex="0" ></canvas>
            <div id="back-image"></div>
        </div>

    </div>
    <div id="right-container">
		<?php
		$parent_id = $_GET['postID'];
        echo wp_get_attachment_image( $parent_id , 'full' );
        ?>

        <div id="controls">
            <div>
                <label for="buttonColor">Scegli il colore</label>
                <input id="buttonColor" class="bottone" type="color">
            </div>
            <div>
                <label for="buttonSize">Scegli la dimensione</label>
                <input id="buttonSize" class="bottone" type="number" value="5">
            </div>
            <div>
                <label for="buttonDetails">Scegli la trasparenza</label>
                <input id="buttonDetails" class="bottone" type="range" min="0" max="100" value="100">
            </div>
            <div>
                <label>Scegli il tratto</label>
                <div id="buttonPen">
                    <label for="circle">Pennello</label>
                    <input id="circle" type="radio" value="round" checked name="lineCap">
                    <label for="square">Quadrato</label>
                    <input id="square" type="radio" value="square" name="lineCap">
                    <label for="highlighter">Evidenziatore</label>
                    <input id="highlighter" type="radio" value="butt" name="lineCap">
                </div></div>
            <div id="buttonWhite" class="bottone">Gomma</div>
            <div id="bottoneCancella" class="bottone">Cancella tutto</div>
            <div id="bottoneSalva" class="bottone">Salva</div>
        </div>
        <div id="sketch-image-description">
			<?php echo get_post($parent_id)->post_content?>
        </div>
    </div>
</div>

<div id="social">
    <p>Condividi sui social il tuo disegno!</p>
    <div class="fb-share-button" data-href="http://localhost/museum_project_wordpress/le-opere/opera-dettaglio/sketch/?postID=62" data-layout="button" data-size="small"><img src="<?php bloginfo('template_url')?>/images/facebook-svgrepo-com.svg" alt="logo di facebook per condivisione disegno" width="60px" height="auto" id="fbShare"></div>
    <a class="twitter-share-button" ><img src="<?php bloginfo('template_url')?>/images/twitter-svgrepo-com.svg" alt="logo di twitter per condivisione disegno" width="60px" height="auto" id="twShare"></a>
</div>


<?php get_footer();?>
