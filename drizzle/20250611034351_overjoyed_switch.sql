ALTER TABLE "books" DROP CONSTRAINT "books_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_authors_id_fk";
--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE cascade;