CREATE TABLE `catalogProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(160) NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`categorySlug` varchar(120) NOT NULL,
	`categoryLabel` varchar(160) NOT NULL,
	`brand` varchar(80) NOT NULL,
	`image` text NOT NULL,
	`variants` text NOT NULL,
	`featured` boolean NOT NULL DEFAULT false,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalogProducts_id` PRIMARY KEY(`id`),
	CONSTRAINT `catalogProducts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `catalogSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`featuredSlugs` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalogSettings_id` PRIMARY KEY(`id`)
);
