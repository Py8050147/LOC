ALTER TABLE "likes" DROP CONSTRAINT "likes_tweet_id_tweets_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP COLUMN IF EXISTS "tweet_id";