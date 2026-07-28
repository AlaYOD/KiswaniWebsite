CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_whatsapp` text NOT NULL,
	`customer_location` text NOT NULL,
	`project_type` text DEFAULT '' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`language` text DEFAULT 'en' NOT NULL,
	`total_pieces` integer NOT NULL,
	`subtotal` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`whatsapp_message` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`product_code` text NOT NULL,
	`product_name` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit_price` integer NOT NULL,
	`line_total` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
