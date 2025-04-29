/*
  Warnings:

  - Added the required column `friendsNotificationId` to the `userTouser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userTouser" ADD COLUMN     "friendsNotificationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "userTouser" ADD CONSTRAINT "userTouser_friendsNotificationId_fkey" FOREIGN KEY ("friendsNotificationId") REFERENCES "notification"("notificationId") ON DELETE RESTRICT ON UPDATE CASCADE;
