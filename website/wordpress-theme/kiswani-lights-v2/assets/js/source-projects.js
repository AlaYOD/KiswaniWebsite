(() => {
	'use strict';

	const page = document.querySelector('.ks-projects-page');
	if (!page || page.dataset.projectsReady === 'true') return;
	page.dataset.projectsReady = 'true';

	const filters = Array.from(page.querySelectorAll('[data-project-filter]'));
	const cards = Array.from(page.querySelectorAll('[data-project-card]'));
	const spanClasses = [0, 1, 2, 3, 4, 5].map((index) => `ks-project-card--${index}`);

	const applyFilter = (value) => {
		filters.forEach((button) => button.setAttribute('aria-pressed', button.dataset.projectFilter === value ? 'true' : 'false'));
		const visible = cards.filter((card) => value === 'all' || card.dataset.projectCategory === value);
		cards.forEach((card) => {
			card.hidden = !visible.includes(card);
			card.classList.remove(...spanClasses);
		});
		visible.forEach((card, index) => {
			card.classList.add(`ks-project-card--${index % spanClasses.length}`);
			if (visible.length % 2 === 1 && index === visible.length - 1) card.classList.add('ks-project-card--last');
		});
	};

	filters.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.projectFilter || 'all')));

	const dialog = document.querySelector('[data-project-dialog]');
	const dialogClose = dialog?.querySelector('[data-project-dialog-close]');
	let dialogTrigger = null;
	const dialogFields = dialog ? {
		image: dialog.querySelector('[data-project-dialog-image]'),
		title: dialog.querySelector('[data-project-dialog-title]'),
		category: dialog.querySelector('[data-project-dialog-category]'),
		summary: dialog.querySelector('[data-project-dialog-summary]'),
		location: dialog.querySelector('[data-project-dialog-location]'),
		type: dialog.querySelector('[data-project-dialog-type]'),
		year: dialog.querySelector('[data-project-dialog-year]'),
	} : null;

	const closeDialog = () => {
		if (!dialog) return;
		dialog.hidden = true;
		document.body.style.overflow = '';
		dialogTrigger?.focus();
	};

	cards.forEach((card) => card.addEventListener('click', () => {
		if (!dialog || !dialogFields) return;
		const project = JSON.parse(card.dataset.project || '{}');
		dialogTrigger = card;
		dialogFields.image.src = project.image || '';
		dialogFields.image.alt = project.title || '';
		dialogFields.title.textContent = project.title || '';
		dialogFields.category.textContent = project.category || '';
		dialogFields.summary.textContent = project.summary || '';
		dialogFields.location.textContent = project.location || '';
		dialogFields.type.textContent = project.category || '';
		dialogFields.year.textContent = project.year || '';
		dialog.hidden = false;
		document.body.style.overflow = 'hidden';
		dialogClose?.focus();
	}));

	dialogClose?.addEventListener('click', closeDialog);
	dialog?.addEventListener('mousedown', (event) => {
		if (event.target === dialog) closeDialog();
	});

	const testimonials = [
		{
			image: `${window.ksThemeUri}/assets/images/editorial/project-dining.webp`,
			quote: 'The team translated our mood references into a clear fixture direction. Every recommendation felt connected to the architecture, not added after it.',
			source: 'Residential client',
			location: 'Ramallah',
		},
		{
			image: `${window.ksThemeUri}/assets/images/editorial/story-lounge.webp`,
			quote: 'Specifications were presented clearly, and the balance between decorative pieces and technical light made coordination much easier.',
			source: 'Interior designer',
			location: 'Bethlehem',
		},
		{
			image: `${window.ksThemeUri}/assets/images/editorial/hero-technical.webp`,
			quote: 'Kiswani helped us keep the retail space visually strong without sacrificing comfortable light for staff and customers.',
			source: 'Retail project team',
			location: 'Nablus',
		},
	];
	let testimonialIndex = 0;
	const testimonialFields = {
		image: page.querySelector('[data-project-testimonial-image]'),
		quote: page.querySelector('[data-project-testimonial-quote]'),
		source: page.querySelector('[data-project-testimonial-source]'),
		location: page.querySelector('[data-project-testimonial-location]'),
		footerLocation: page.querySelector('[data-project-testimonial-footer-location]'),
		count: page.querySelector('[data-project-testimonial-count]'),
	};

	const renderTestimonial = () => {
		const testimonial = testimonials[testimonialIndex];
		testimonialFields.image.src = testimonial.image;
		testimonialFields.image.alt = testimonial.source;
		testimonialFields.quote.textContent = `“${testimonial.quote}”`;
		testimonialFields.source.textContent = testimonial.source;
		testimonialFields.location.textContent = testimonial.location;
		testimonialFields.footerLocation.textContent = testimonial.location;
		testimonialFields.count.textContent = `0${testimonialIndex + 1} / 0${testimonials.length}`;
	};

	page.querySelectorAll('[data-project-testimonial]').forEach((button) => button.addEventListener('click', () => {
		testimonialIndex = button.dataset.projectTestimonial === 'previous'
			? (testimonialIndex - 1 + testimonials.length) % testimonials.length
			: (testimonialIndex + 1) % testimonials.length;
		renderTestimonial();
	}));

	const contact = document.querySelector('[data-project-contact]');
	const contactBackdrop = document.querySelector('[data-project-contact-backdrop]');
	const openContact = () => {
		if (!contact || !contactBackdrop) return;
		contact.hidden = false;
		contactBackdrop.hidden = false;
		contact.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
	};
	const closeContact = () => {
		if (!contact || !contactBackdrop) return;
		contact.hidden = true;
		contactBackdrop.hidden = true;
		contact.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
	};

	document.querySelectorAll('[data-project-contact-open]').forEach((button) => button.addEventListener('click', openContact));
	contact?.querySelector('[data-project-contact-close]')?.addEventListener('click', closeContact);
	contactBackdrop?.addEventListener('click', closeContact);
	contact?.querySelector('form')?.addEventListener('submit', (event) => event.preventDefault());

	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') return;
		if (dialog && !dialog.hidden) closeDialog();
		if (contact && !contact.hidden) closeContact();
	});
})();

