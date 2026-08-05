<?php
/**
 * Homepage contact call-to-action.
 */
?>
<section class="ks-home-contact" id="contact">
	<img class="ks-home-contact__image" src="<?php echo esc_url( $asset( 'editorial/contact-room.webp' ) ); ?>" alt="Warmly lit living space">
	<div class="ks-home-contact__overlay" aria-hidden="true"></div>
	<div class="ks-home-contact__frame" aria-hidden="true"></div>
	<div class="ks-home-contact__geometry" aria-hidden="true"></div>
	<div class="ks-home-contact__inner">
		<div class="ks-home-contact__content">
			<div class="ks-home-contact__icon" aria-hidden="true">
				<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>
			</div>
			<h2>Let’s light your next space.</h2>
			<p>Decorative lighting, technical systems, and practical project support in one place.</p>
			<button type="button" data-ks-contact-open>Contact Kiswani <svg viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg></button>
		</div>
	</div>
</section>

<div class="ks-contact-drawer" data-ks-contact-drawer hidden aria-hidden="true">
	<button class="ks-contact-drawer__backdrop" type="button" data-ks-contact-close tabindex="-1" aria-label="Close contact form"></button>
	<aside class="ks-contact-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="ks-contact-title" tabindex="-1">
		<header class="ks-contact-drawer__header">
			<div><span aria-hidden="true"></span><b>Kiswani Lights</b></div>
			<button type="button" data-ks-contact-close aria-label="Close contact form"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
		</header>
		<form class="ks-contact-form" data-ks-contact-form>
			<div class="ks-contact-form__title">
				<div><p>PROJECT ENQUIRY</p><h3 id="ks-contact-title">Tell us about your space</h3></div>
				<span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg></span>
			</div>
			<div class="ks-contact-form__row">
				<label>Your name<input name="name" required autocomplete="name"></label>
				<label>Phone or WhatsApp<input name="phone" required type="tel" autocomplete="tel" inputmode="tel"></label>
			</div>
			<label>Project type<select name="projectType" required><option value="" selected disabled>Choose project type</option><option value="Residential">Residential</option><option value="Commercial">Commercial</option><option value="Hospitality">Hospitality</option><option value="Other">Other</option></select></label>
			<label>Project details<textarea name="details" required rows="4" placeholder="Space, style, timeline, and the lighting you need"></textarea></label>
			<button class="ks-contact-form__submit" type="submit">Continue in WhatsApp <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></button>
			<div class="ks-contact-form__status" data-ks-contact-status hidden aria-live="polite"><p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg><span>Your request is ready. Complete sending it in WhatsApp.</span></p><a data-ks-contact-whatsapp target="_blank" rel="noreferrer">Open WhatsApp <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path></svg></a></div>
		</form>
	</aside>
</div>
