<?php
/**
 * Source-matched lighting projects page.
 *
 * @package Kiswani_Lights_V2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$projects   = kiswani_projects_data();
$theme_uri  = get_template_directory_uri();
$categories = array(
	'residential' => 'Residential',
	'hospitality' => 'Hospitality',
	'retail'      => 'Retail',
);

get_header( 'source' );
?>
<main class="ks-projects-page">
	<section class="ks-projects-hero" id="top">
		<img src="<?php echo esc_url( $theme_uri . '/assets/images/editorial/project-dining.webp' ); ?>" alt="Warm architectural dining project">
		<div class="ks-projects-hero__overlay"></div>
		<div class="ks-projects-hero__frame" aria-hidden="true"></div>
		<div class="ks-projects-hero__geometry" aria-hidden="true"></div>
		<div class="ks-projects-hero__inner">
			<div class="ks-projects-hero__copy">
				<div class="ks-projects-kicker ks-projects-kicker--yellow"><span></span><p>KISWANI PROJECTS / 2026</p></div>
				<h1>Lighting projects</h1>
				<p>Residential, hospitality, and retail spaces shaped through decorative presence, technical precision, and careful control of atmosphere.</p>
				<div class="ks-projects-hero__actions">
					<a href="#projects"><span>Explore projects</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg></a>
					<button type="button" data-project-contact-open><span>Start your project</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></button>
				</div>
			</div>
		</div>
	</section>

	<section class="ks-project-gallery" id="projects">
		<div class="ks-project-gallery__rail" aria-hidden="true"></div>
		<div class="ks-project-gallery__inner">
			<header>
				<div>
					<div class="ks-projects-kicker ks-projects-kicker--bronze"><span></span><p>PROJECT GALLERY</p></div>
					<h2>Lighting studies shaped around the space.</h2>
				</div>
				<p>Explore residential, hospitality, and retail lighting directions where fixture scale, material, and atmosphere are considered together.</p>
			</header>
			<div class="ks-project-filters" role="group" aria-label="Project gallery">
				<button type="button" aria-pressed="true" data-project-filter="all">All projects</button>
				<?php foreach ( $categories as $slug => $label ) : ?>
					<button type="button" aria-pressed="false" data-project-filter="<?php echo esc_attr( $slug ); ?>"><?php echo esc_html( $label ); ?></button>
				<?php endforeach; ?>
			</div>
			<div class="ks-project-grid" data-project-grid>
				<?php foreach ( $projects as $index => $project ) : ?>
					<?php
					$project_payload = wp_json_encode(
						array(
							'title'    => $project['title'],
							'category' => $categories[ $project['category'] ] ?? ucfirst( $project['category'] ),
							'categorySlug' => $project['category'],
							'location' => $project['location'],
							'year'     => $project['year'],
							'image'    => $theme_uri . '/assets' . $project['image'],
							'summary'  => $project['summary'],
						)
					);
					?>
					<button class="ks-project-card ks-project-card--<?php echo esc_attr( (string) ( $index % 6 ) ); ?>" type="button" data-project-card data-project-category="<?php echo esc_attr( $project['category'] ); ?>" data-project="<?php echo esc_attr( $project_payload ); ?>" aria-label="View project: <?php echo esc_attr( $project['title'] ); ?>">
						<img src="<?php echo esc_url( $theme_uri . '/assets' . $project['image'] ); ?>" alt="<?php echo esc_attr( $project['title'] ); ?>" decoding="async">
						<span class="ks-project-card__overlay" aria-hidden="true"></span>
						<span class="ks-project-card__content">
							<span class="ks-project-card__meta"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><?php echo esc_html( $project['location'] . ' / ' . $project['year'] ); ?></span>
							<span class="ks-project-card__heading"><strong><?php echo esc_html( $project['title'] ); ?></strong><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></i></span>
							<span class="ks-project-card__category"><?php echo esc_html( $categories[ $project['category'] ] ?? ucfirst( $project['category'] ) ); ?></span>
						</span>
					</button>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="ks-project-testimonials">
		<div class="ks-project-testimonials__inner">
			<div class="ks-project-testimonials__image">
				<img data-project-testimonial-image src="<?php echo esc_url( $theme_uri . '/assets/images/editorial/project-dining.webp' ); ?>" alt="Residential client">
				<span aria-hidden="true"></span>
				<div><div><p>PROJECT FEEDBACK</p><strong data-project-testimonial-location>Ramallah</strong></div><em data-project-testimonial-count>01 / 03</em></div>
			</div>
			<div class="ks-project-testimonials__copy">
				<div>
					<div class="ks-project-testimonials__heading"><div><p>PROJECT FEEDBACK</p><h2>What project partners value.</h2></div><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 5-4 5v3ZM14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 5-4 5v3Z"/></svg></span></div>
					<div class="ks-project-testimonials__quote"><blockquote data-project-testimonial-quote>&ldquo;The team translated our mood references into a clear fixture direction. Every recommendation felt connected to the architecture, not added after it.&rdquo;</blockquote></div>
				</div>
				<footer><div><strong data-project-testimonial-source>Residential client</strong><span data-project-testimonial-footer-location>Ramallah</span></div><div><button type="button" data-project-testimonial="previous" aria-label="Previous testimonial"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button><button type="button" data-project-testimonial="next" aria-label="Next testimonial"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button></div></footer>
			</div>
		</div>
	</section>

	<section class="ks-project-process">
		<div class="ks-project-process__inner">
			<header>
				<div><div class="ks-projects-kicker"><span></span><p>OUR PROJECT APPROACH</p></div><h2>From the first plan to the final lighting scene.</h2></div>
				<p>Every project begins with the space. We align fixture scale, technical performance, and atmosphere before selecting the final products.</p>
			</header>
			<div class="ks-project-process__grid">
				<article><div><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.3 8.7 8.7 21.3a2.4 2.4 0 0 1-3.4 0l-2.6-2.6a2.4 2.4 0 0 1 0-3.4L15.3 2.7a2.4 2.4 0 0 1 3.4 0l2.6 2.6a2.4 2.4 0 0 1 0 3.4Z"/><path d="m7.5 13.5 2 2m-5-5 2 2m6-6 2 2m2-5 2 2"/></svg></span><em>01</em></div><h3>Read the space</h3><p>We review dimensions, materials, ceiling conditions, and how people use the space.</p><svg class="ks-project-process__check" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="m9 11 3 3L22 4"/></svg></article>
				<article><div><span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M2 12h7m6 0h7M12 2v7m0 6v7M4.9 4.9l4.9 4.9m4.4 4.4 4.9 4.9m0-14.2-4.9 4.9m-4.4 4.4-4.9 4.9"/></svg></span><em>02</em></div><h3>Build the lighting direction</h3><p>Decorative and technical layers are balanced around focus, comfort, and visual rhythm.</p><svg class="ks-project-process__check" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="m9 11 3 3L22 4"/></svg></article>
				<article><div><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6m-5 4h4m1.1-8.4A7 7 0 1 0 8.9 13.6C9.6 14.3 10 15 10 16h4c0-1 .4-1.7 1.1-2.4Z"/></svg></span><em>03</em></div><h3>Specify with confidence</h3><p>Fixtures, output, temperature, and controls are resolved into a practical final selection.</p><svg class="ks-project-process__check" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="m9 11 3 3L22 4"/></svg></article>
			</div>
		</div>
	</section>

	<section class="ks-project-cta">
		<div><div><h2>Planning a space that needs the right light?</h2><p>Share the plan, dimensions, or inspiration with our project team.</p></div><button type="button" data-project-contact-open><span>Start your project</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></button></div>
	</section>
</main>

<div class="ks-project-dialog" data-project-dialog hidden>
	<section role="dialog" aria-modal="true" aria-labelledby="ks-project-dialog-title">
		<button type="button" data-project-dialog-close aria-label="Close project">&times;</button>
		<div class="ks-project-dialog__image"><img data-project-dialog-image src="" alt=""></div>
		<div class="ks-project-dialog__copy"><div><div class="ks-project-dialog__kicker"><span></span><p data-project-dialog-category></p></div><h2 id="ks-project-dialog-title" data-project-dialog-title></h2><p data-project-dialog-summary></p></div><dl><div><dt>Location</dt><dd data-project-dialog-location></dd></div><div><dt>Project type</dt><dd data-project-dialog-type></dd></div><div><dt>Year</dt><dd data-project-dialog-year></dd></div></dl></div>
	</section>
</div>

<aside class="ks-project-contact" data-project-contact hidden aria-hidden="true">
	<button type="button" data-project-contact-close aria-label="Close project form">&times;</button>
	<p>START A PROJECT</p><h2>Tell us about your space.</h2><form><label>Name<input type="text" name="name" required></label><label>Email<input type="email" name="email" required></label><label>Project type<select name="project_type"><option>Residential</option><option>Hospitality</option><option>Retail</option></select></label><label>Project details<textarea name="message" rows="5"></textarea></label><button type="submit">Send project request</button></form>
</aside>
<div class="ks-project-contact__backdrop" data-project-contact-backdrop hidden></div>
<?php
get_footer( 'source' );

