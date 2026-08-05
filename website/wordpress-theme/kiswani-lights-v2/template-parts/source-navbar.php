<?php
/**
 * Source-exact desktop mega menu and mobile navigation drawer.
 *
 * Expects $source_nav_groups, $source_nav_asset, and $source_nav_href from
 * header-source-home.php.
 *
 * @package Kiswani_Lights
 */

defined( 'ABSPATH' ) || exit;

$source_nav_chevron_down = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
$source_nav_arrow_up     = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
$source_nav_chevron      = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
$source_nav_bag          = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>';
?>
<div class="ks-source-desktop-menu" data-ks-desktop-menu>
	<nav class="ks-desktop-nav" aria-label="Product categories">
		<div class="ks-desktop-nav__inner">
			<a href="#products" data-ks-menu-key="all" aria-expanded="false" aria-controls="collection-mega-menu"><span>Products</span><?php echo $source_nav_chevron_down; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><i class="ks-nav-underline" aria-hidden="true"></i></a>
			<?php foreach ( $source_nav_groups as $source_nav_group ) : ?>
				<a href="<?php echo esc_url( $source_nav_href( $source_nav_group ) ); ?>" data-ks-menu-key="<?php echo esc_attr( $source_nav_group['id'] ); ?>" aria-expanded="false" aria-controls="collection-mega-menu"><span><?php echo esc_html( $source_nav_group['label']['en'] ); ?></span><?php echo $source_nav_chevron_down; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><i class="ks-nav-underline" aria-hidden="true"></i></a>
			<?php endforeach; ?>
			<a href="<?php echo esc_url( home_url( '/projects/' ) ); ?>"><span>Projects</span><i class="ks-nav-underline" aria-hidden="true"></i></a>
		</div>
	</nav>

	<div class="ks-source-mega-menu" id="collection-mega-menu" aria-hidden="true" hidden>
		<section class="ks-source-mega-panel ks-source-mega-panel--all" data-ks-mega-panel="all" hidden>
			<div class="ks-source-mega-intro">
				<div><p>All collections</p><h2>Find the right light for every space.</h2><span>Browse decorative, interior, technical, and accent lighting together.</span></div>
				<a href="#products"><b>View all products</b><?php echo $source_nav_arrow_up; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
			</div>
			<div class="ks-source-mega-all-grid">
				<?php foreach ( $source_nav_groups as $source_nav_group ) : ?>
					<?php $source_nav_total = array_sum( array_map( static fn( $section ) => count( $section['items'] ?? array() ), $source_nav_group['sections'] ?? array() ) ); ?>
					<a class="ks-source-mega-group-card" href="<?php echo esc_url( $source_nav_href( $source_nav_group ) ); ?>">
						<span class="ks-source-mega-group-image"><img src="<?php echo esc_url( $source_nav_asset( $source_nav_group['image'] ) ); ?>" alt="<?php echo esc_attr( $source_nav_group['label']['en'] ); ?>"><i aria-hidden="true"></i><b><span><?php echo esc_html( $source_nav_group['label']['en'] ); ?></span><?php echo $source_nav_arrow_up; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></b></span>
						<span class="ks-source-mega-group-copy"><small><?php echo esc_html( $source_nav_total ); ?> categories</small><span>
							<?php foreach ( array_slice( $source_nav_group['sections'] ?? array(), 0, 3 ) as $source_nav_section ) : ?><em><?php echo esc_html( $source_nav_section['label']['en'] ); ?></em><?php endforeach; ?>
						</span></span>
					</a>
				<?php endforeach; ?>
			</div>
		</section>

		<?php foreach ( $source_nav_groups as $source_nav_group ) : ?>
			<section class="ks-source-mega-panel ks-source-mega-panel--group<?php echo 'i-lite' === $source_nav_group['id'] ? ' is-ilite' : ''; ?>" data-ks-mega-panel="<?php echo esc_attr( $source_nav_group['id'] ); ?>" hidden>
				<div class="ks-source-mega-intro ks-source-mega-intro--group">
					<div><p>Product map</p><h2><?php echo esc_html( $source_nav_group['label']['en'] ); ?></h2><span><?php echo esc_html( $source_nav_group['description']['en'] ); ?></span></div>
					<a href="<?php echo esc_url( $source_nav_href( $source_nav_group ) ); ?>"><b>Browse this group</b><?php echo $source_nav_arrow_up; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
				</div>
				<div class="ks-source-mega-sections-rail"><div class="ks-source-mega-sections">
					<?php foreach ( $source_nav_group['sections'] ?? array() as $source_nav_section ) : ?>
						<article class="ks-source-mega-section-card">
							<a class="ks-source-mega-section-image" href="<?php echo esc_url( $source_nav_href( $source_nav_group, $source_nav_section ) ); ?>"><img src="<?php echo esc_url( $source_nav_asset( $source_nav_section['image'] ) ); ?>" alt="<?php echo esc_attr( $source_nav_section['label']['en'] ); ?>"><i aria-hidden="true"></i><b><span><?php echo esc_html( $source_nav_section['label']['en'] ); ?></span><?php echo $source_nav_arrow_up; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></b></a>
							<div class="ks-source-mega-section-copy"><small><?php echo esc_html( count( $source_nav_section['items'] ?? array() ) ); ?> categories</small><div>
								<?php foreach ( $source_nav_section['items'] ?? array() as $source_nav_item ) : ?><a href="<?php echo esc_url( $source_nav_href( $source_nav_group, $source_nav_section, $source_nav_item ) ); ?>"><span><?php echo esc_html( $source_nav_item['label']['en'] ); ?></span><?php echo $source_nav_chevron; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a><?php endforeach; ?>
							</div></div>
						</article>
					<?php endforeach; ?>
				</div></div>
			</section>
		<?php endforeach; ?>
	</div>
</div>

<button class="ks-source-mobile-backdrop" type="button" data-ks-mobile-menu-backdrop aria-label="Close menu overlay" hidden></button>
<aside class="ks-source-mobile-nav" id="mobile-navigation" aria-hidden="true">
	<header class="ks-source-mobile-nav__head">
		<a href="#top" aria-label="Kiswani Lights home"><img src="<?php echo esc_url( $theme_image_uri . 'kiswani-logo-header-lockup.png' ); ?>" alt="Kiswani Lights"></a>
		<button type="button" data-ks-mobile-menu-close aria-label="Close menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
	</header>

	<nav class="ks-source-mobile-nav__body" aria-label="Mobile product categories">
		<div class="ks-source-mobile-accordion">
			<section>
				<button type="button" data-ks-mobile-group="all" aria-expanded="false"><span><i class="ks-source-mobile-product-icon"><?php echo $source_nav_bag; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></i><b>Products</b></span><?php echo $source_nav_chevron_down; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
				<div class="ks-source-mobile-panel" data-ks-mobile-panel="all" hidden>
					<a class="ks-source-mobile-view-all" href="#products"><b>View all products</b><?php echo $source_nav_arrow_up; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
					<div class="ks-source-mobile-all-cards">
						<?php foreach ( $source_nav_groups as $source_nav_group ) : ?>
							<?php $source_nav_total = array_sum( array_map( static fn( $section ) => count( $section['items'] ?? array() ), $source_nav_group['sections'] ?? array() ) ); ?>
							<a href="<?php echo esc_url( $source_nav_href( $source_nav_group ) ); ?>" class="ks-source-mobile-all-card"><span><img src="<?php echo esc_url( $source_nav_asset( $source_nav_group['image'] ) ); ?>" alt="<?php echo esc_attr( $source_nav_group['label']['en'] ); ?>"><i aria-hidden="true"></i><b><?php echo esc_html( $source_nav_group['label']['en'] ); ?><?php echo $source_nav_arrow_up; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></b></span><small><?php echo esc_html( $source_nav_total ); ?> categories</small><em>
								<?php foreach ( array_slice( $source_nav_group['sections'] ?? array(), 0, 3 ) as $source_nav_section ) : ?><span><?php echo esc_html( $source_nav_section['label']['en'] ); ?><?php echo $source_nav_chevron; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span><?php endforeach; ?>
							</em></a>
						<?php endforeach; ?>
					</div>
				</div>
			</section>

			<?php foreach ( $source_nav_groups as $source_nav_group ) : ?>
				<section>
					<button type="button" data-ks-mobile-group="<?php echo esc_attr( $source_nav_group['id'] ); ?>" aria-expanded="false"><span><i class="ks-source-mobile-group-image"><img src="<?php echo esc_url( $source_nav_asset( $source_nav_group['image'] ) ); ?>" alt=""><em aria-hidden="true"></em></i><b><?php echo esc_html( $source_nav_group['label']['en'] ); ?></b></span><?php echo $source_nav_chevron_down; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
					<div class="ks-source-mobile-panel" data-ks-mobile-panel="<?php echo esc_attr( $source_nav_group['id'] ); ?>" hidden>
						<?php foreach ( $source_nav_group['sections'] ?? array() as $source_nav_section ) : ?>
							<article class="ks-source-mobile-section-card<?php echo 'i-lite' === $source_nav_group['id'] ? ' is-ilite' : ''; ?>"><a href="<?php echo esc_url( $source_nav_href( $source_nav_group, $source_nav_section ) ); ?>"><span><img src="<?php echo esc_url( $source_nav_asset( $source_nav_section['image'] ) ); ?>" alt="<?php echo esc_attr( $source_nav_section['label']['en'] ); ?>"><i aria-hidden="true"></i></span><b><?php echo esc_html( $source_nav_section['label']['en'] ); ?><?php echo $source_nav_arrow_up; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></b></a><div>
								<?php foreach ( $source_nav_section['items'] ?? array() as $source_nav_item ) : ?><a href="<?php echo esc_url( $source_nav_href( $source_nav_group, $source_nav_section, $source_nav_item ) ); ?>"><span><?php echo esc_html( $source_nav_item['label']['en'] ); ?></span><?php echo $source_nav_chevron; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a><?php endforeach; ?>
							</div></article>
						<?php endforeach; ?>
					</div>
				</section>
			<?php endforeach; ?>
		</div>
		<a class="ks-source-mobile-projects" href="<?php echo esc_url( home_url( '/projects/' ) ); ?>"><span>Projects</span><?php echo $source_nav_chevron; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
	</nav>

	<footer class="ks-source-mobile-nav__foot">
		<label><span class="screen-reader-text">Select language</span><select aria-label="Select language"><option value="en">English</option><option value="ar">&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577;</option><option value="he">&#1506;&#1489;&#1512;&#1497;&#1514;</option></select></label>
		<a href="#contact">Contact <?php echo $source_nav_arrow_up; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></a>
	</footer>
</aside>
