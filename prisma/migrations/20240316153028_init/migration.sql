/*
  Warnings:

  - The primary key for the `userJoinEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `JoinId` on the `userJoinEvent` table. All the data in the column will be lost.
  - You are about to drop the `eventPrompt` table. If the table is not empty, all the data it contains will be lost.
  - The required column `joinId` was added to the `userJoinEvent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "userFavourEvent" DROP CONSTRAINT "userFavourEvent_event_id_fkey";

-- DropForeignKey
ALTER TABLE "userJoinEvent" DROP CONSTRAINT "userJoinEvent_event_id_fkey";

-- AlterTable
ALTER TABLE "userJoinEvent" DROP CONSTRAINT "userJoinEvent_pkey",
DROP COLUMN "JoinId",
ADD COLUMN     "joinId" TEXT NOT NULL,
ADD CONSTRAINT "userJoinEvent_pkey" PRIMARY KEY ("joinId");

-- DropTable
DROP TABLE "eventPrompt";

-- CreateTable
CREATE TABLE "event" (
    "eventId" TEXT NOT NULL,
    "eventHost" TEXT NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "eventType" INTEGER NOT NULL,
    "eventDate" DATE NOT NULL,
    "eventDescriptionContent" TEXT NOT NULL,
    "eventTime" TEXT NOT NULL,
    "ImageCoverUpload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventInviteType" INTEGER,

    CONSTRAINT "event_pkey" PRIMARY KEY ("eventId")
);

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_eventHost_fkey" FOREIGN KEY ("eventHost") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userJoinEvent" ADD CONSTRAINT "userJoinEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavourEvent" ADD CONSTRAINT "userFavourEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;
