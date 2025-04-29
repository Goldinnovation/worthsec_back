-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_eventHost_fkey";

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_eventHost_fkey" FOREIGN KEY ("eventHost") REFERENCES "account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
