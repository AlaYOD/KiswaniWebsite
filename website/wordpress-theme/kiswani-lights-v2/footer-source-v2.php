<?php
/**
 * Shared source-matched public footer.
 *
 * @package Kiswani_Lights_V2
 */
?>
<footer class="ks-footer ks-footer--v2">
	<div class="ks-footer__inner">
		<div class="ks-footer__grid">
			<div class="ks-footer__brand">
				<div class="ks-footer__logo-wrap"><img class="ks-footer__logo" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/kiswani-logo-since-1994.png' ); ?>" alt="Kiswani Lights"></div>
				<h2>Lighting is not decoration. It is the soul of the space.</h2>
				<div class="ks-rule-label"><span></span><p>Decorative &middot; Technical &middot; Architectural</p></div>
			</div>

			<div class="ks-footer__column">
				<p class="ks-footer__title">EXPLORE</p>
				<nav aria-label="Footer navigation">
					<a href="<?php echo esc_url( home_url( '/#collections' ) ); ?>"><span>Collections</span><em>01</em></a>
					<a href="<?php echo esc_url( home_url( '/#types' ) ); ?>"><span>Lighting types</span><em>02</em></a>
					<a href="<?php echo esc_url( home_url( '/#products' ) ); ?>"><span>Products</span><em>03</em></a>
					<a href="<?php echo esc_url( home_url( '/projects/' ) ); ?>"><span>Projects</span><em>04</em></a>
				</nav>
			</div>

			<div class="ks-footer__column">
				<p class="ks-footer__title">IMPORTANT LINKS</p>
				<nav aria-label="Important links">
					<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><span>About us</span><em>01</em></a>
					<a href="<?php echo esc_url( home_url( '/support/' ) ); ?>"><span>Support</span><em>02</em></a>
					<a href="<?php echo esc_url( home_url( '/privacy/' ) ); ?>"><span>Privacy policy</span><em>03</em></a>
					<a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>"><span>Terms of use</span><em>04</em></a>
				</nav>
			</div>

			<div class="ks-footer__column ks-footer__contact">
				<p class="ks-footer__title">CONTACT</p>
				<div>
					<a href="mailto:info@kiswanilights.com">info@kiswanilights.com</a>
					<a href="tel:+970599671209">+970 599 67 12 09</a>
					<p>Ramallah<br>Palestine</p>
				</div>
				<a class="ks-footer-cta" href="<?php echo esc_url( home_url( '/#contact' ) ); ?>"><span>START A PROJECT</span><i>&nearr;</i></a>
			</div>
		</div>

		<div class="ks-footer__bottom">
			<span>&copy; 2026 Kiswani Lights</span>
			<div><a href="<?php echo esc_url( home_url( '/checkout/' ) ); ?>">Checkout</a><a href="<?php echo esc_url( home_url( '/privacy/' ) ); ?>">Privacy</a><a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>">Terms</a><span>Ramallah, Palestine</span></div>
		</div>
	</div>
	<div class="ks-footer__word" aria-hidden="true">KISWANI</div>
</footer>
<?php get_template_part( 'template-parts/source-cart-drawer' ); ?>
<?php wp_footer(); ?>
</body>
</html>
