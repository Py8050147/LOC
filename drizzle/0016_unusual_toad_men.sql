ALTER TABLE "comments" DROP CONSTRAINT "comments_tweet_Id_tweets_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN IF EXISTS "tweet_Id";