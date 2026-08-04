<?php
/**
 * Pixel-parity homepage opening band: hero, metrics, motif, and statement.
 *
 * @package Kiswani_Lights
 */

defined( 'ABSPATH' ) || exit;
?>
<section class="ks-hero" id="top" data-ks-hero>
	<div class="ks-hero__image" data-ks-hero-image style="background-image:url('<?php echo esc_url( $asset( 'editorial/hero-interior.webp' ) ); ?>')"></div>
	<div class="ks-hero__veil ks-hero__veil--horizontal"></div>
	<div class="ks-hero__veil ks-hero__veil--vertical"></div>
	<div class="ks-hero__frame"></div>
	<div class="ks-hero__geometry" aria-hidden="true"></div>
	<div class="ks-hero__copy">
		<div class="ks-hero__content">
			<div class="ks-kicker"><span></span><p>KISWANI LIGHTS / 2026</p></div>
			<h1><span>Lighting isn’t just</span><mark>a decorative piece.</mark></h1>
			<p class="ks-hero__body">Lighting is the soul of the space. We select decorative and technical solutions that make every room feel intentional.</p>
			<div class="ks-buttons">
				<a href="#collections"><span>Explore lighting</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></a>
				<a href="#contact"><span>Start a project</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></a>
			</div>
			<div class="ks-hero__scene">
				<div><strong data-ks-scene-name>Interior lighting</strong><small data-ks-scene-detail>Warm, considered light for everyday living.</small></div>
				<div><b data-ks-scene-index>01</b><button data-ks-scene="0" class="is-active" aria-label="Show Interior lighting"></button><button data-ks-scene="1" aria-label="Show Decorative lighting"></button><button data-ks-scene="2" aria-label="Show Technical lighting"></button><button data-ks-scene="3" aria-label="Show Accent lighting"></button></div>
			</div>
		</div>
		<div class="ks-hero__rail" aria-label="Hero scenes"><button data-ks-scene="0" class="is-active"><span>Interior lighting</span><i></i></button><button data-ks-scene="1"><span>Decorative lighting</span><i></i></button><button data-ks-scene="2"><span>Technical lighting</span><i></i></button><button data-ks-scene="3"><span>Accent lighting</span><i></i></button></div>
	</div>
</section>
<section class="ks-metrics">
	<div class="ks-metrics__grid">
		<div><b data-ks-metric="90" data-ks-metric-suffix="+">90+</b><span>High-CRI light</span></div>
		<div><b data-ks-metric="48" data-ks-metric-suffix="H">48H</b><span>Project support</span></div>
		<div><b data-ks-metric="360" data-ks-metric-suffix="°">360°</b><span>Decorative + technical</span></div>
	</div>
</section>
<div class="ks-divider" aria-hidden="true"><span></span></div>
<section class="ks-statement">
	<div class="ks-statement__inner">
		<div class="ks-statement__index"><span>02</span><i></i></div>
		<h2>Lighting is the soul of the space.</h2>
		<p>The right fixture does more than illuminate. It gives materials depth, creates a focal point, and changes how the whole space feels.</p>
	</div>
</section>
