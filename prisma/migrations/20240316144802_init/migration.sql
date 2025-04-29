/*
  Warnings:

  - You are about to drop the `userFavorEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userFavorEvent" DROP CONSTRAINT "userFavorEvent_event_id_fkey";

-- DropForeignKey
ALTER TABLE "userFavorEvent" DROP CONSTRAINT "userFavorEvent_user_id_fkey";

-- DropTable
DROP TABLE "userFavorEvent";

-- CreateTable
CREATE TABLE "userFavourEvent" (
    "favourId" TEXT NOT NULL,
    "currentUser_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userFavourEvent_pkey" PRIMARY KEY ("favourId")
);

-- AddForeignKey
ALTER TABLE "userFavourEvent" ADD CONSTRAINT "userFavourEvent_currentUser_id_fkey" FOREIGN KEY ("currentUser_id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavourEvent" ADD CONSTRAINT "userFavourEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "eventPrompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
