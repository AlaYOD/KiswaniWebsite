<?php
/** Accessible source-matched cart drawer. */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="ks-cart-overlay" data-ks-cart-overlay hidden>
	<aside class="ks-cart-drawer" role="dialog" aria-modal="true" aria-labelledby="ks-cart-title" tabindex="-1">
		<header class="ks-cart-drawer__header">
			<div><p>Kiswani store</p><h2 id="ks-cart-title">Your cart</h2></div>
			<button type="button" data-ks-cart-close aria-label="Close cart">&times;</button>
		</header>
		<div class="ks-cart-drawer__body">
			<div class="ks-cart-drawer__empty" data-ks-cart-empty>
				<span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg></span>
				<h3>Your cart is empty</h3>
				<p>Add the lighting pieces you love and we will prepare your order total.</p>
			</div>
			<div class="ks-cart-drawer__items" data-ks-cart-items hidden></div>
		</div>
		<footer class="ks-cart-drawer__footer" data-ks-cart-footer>
			<div class="ks-cart-drawer__totals" data-ks-cart-totals hidden>
				<div><span>Total pieces</span><strong><b data-ks-cart-count>0</b> pieces</strong></div>
				<div><span>Initial subtotal</span><strong data-ks-cart-subtotal>&#8362;0</strong></div>
				<p>Initial prices are calculated from the catalog. Kiswani will confirm availability, delivery, and final approval before order processing.</p>
				<a href="<?php echo esc_url( home_url( '/checkout/' ) ); ?>">Continue to checkout <span>&rarr;</span></a>
				<button type="button" data-ks-cart-clear>Clear cart</button>
			</div>
			<button class="ks-cart-continue" type="button" data-ks-cart-close-empty>Continue shopping</button>
		</footer>
	</aside>
</div>
