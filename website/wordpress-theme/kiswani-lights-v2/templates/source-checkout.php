<?php
/** Source-matched checkout page. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header( 'source' );
?>
<main class="ks-checkout" id="top">
	<section class="ks-checkout-hero">
		<div class="ks-checkout-container">
			<a class="ks-checkout-back" href="<?php echo esc_url( home_url( '/#products' ) ); ?>">
				<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
				<span>Continue shopping</span>
			</a>
			<div class="ks-checkout-hero-grid">
				<div class="ks-checkout-hero-copy">
					<div class="ks-checkout-kicker"><span></span><p>Kiswani checkout</p></div>
					<h1>Complete your lighting order.</h1>
				</div>
				<div class="ks-checkout-count">
					<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
					<span><b data-ks-checkout-count>0</b> pieces</span>
				</div>
			</div>
		</div>
	</section>

	<section class="ks-checkout-body">
		<div class="ks-checkout-layout">
			<section class="ks-checkout-summary" aria-labelledby="ks-order-summary-title">
				<header><h2 id="ks-order-summary-title">Order summary</h2><button type="button" data-ks-checkout-clear hidden>Clear</button></header>
				<div class="ks-checkout-empty" data-ks-checkout-empty>
					<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
					<h3>Your cart is empty</h3>
					<a href="<?php echo esc_url( home_url( '/#products' ) ); ?>">Browse products</a>
				</div>
				<div class="ks-checkout-items" data-ks-checkout-items hidden></div>
				<div class="ks-checkout-subtotal" data-ks-checkout-subtotal-wrap hidden>
					<div><span>Initial subtotal</span><strong data-ks-checkout-subtotal>₪0</strong></div>
					<p>Initial prices are calculated from the catalog. A Kiswani advisor will confirm availability, lead time, delivery, and final approval before processing the order.</p>
				</div>
			</section>

			<form class="ks-checkout-form" data-ks-checkout-form>
				<div class="ks-checkout-form-line"></div>
				<h2>Customer &amp; delivery details</h2>
				<p class="ks-checkout-form-intro">Enter your details and WhatsApp will open with your prepared order and calculated subtotal.</p>
				<div class="ks-checkout-fields">
					<label>Full name<input required name="name" autocomplete="name"></label>
					<label>WhatsApp number<input required name="phone" inputmode="tel" autocomplete="tel"></label>
					<label>Email<input required name="email" type="email" autocomplete="email"></label>
					<label>Location<input required name="city" autocomplete="address-level2"></label>
					<label class="ks-checkout-span">Project type<select required name="project_type"><option value="" selected disabled>Select project type</option><option>Home / Residential</option><option>Office / Commercial</option><option>Hospitality</option><option>Retail</option><option>Other</option></select></label>
					<label class="ks-checkout-span">Address or site details<input name="address" autocomplete="street-address"></label>
					<label class="ks-checkout-span">Order notes<textarea name="notes" rows="4"></textarea></label>
				</div>
				<button class="ks-checkout-submit" disabled type="submit">
					<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
					<span data-ks-checkout-submit-label>Send order via WhatsApp</span>
				</button>
				<p class="ks-checkout-message ks-checkout-error" data-ks-checkout-error hidden></p>
				<p class="ks-checkout-message ks-checkout-success" data-ks-checkout-success hidden>
					<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
					Your order was prepared and WhatsApp opened.
				</p>
			</form>
		</div>
	</section>
</main>
<?php get_footer( 'source' ); ?>
