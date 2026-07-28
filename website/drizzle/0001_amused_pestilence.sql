ALTER TABLE `orders` ADD `admin_note` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL;