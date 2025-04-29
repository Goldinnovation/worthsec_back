/*
  Warnings:

  - You are about to drop the column `friendsNotificationId` on the `userTouser` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "userTouser" DROP CONSTRAINT "userTouser_friendsNotificationId_fkey";

-- AlterTable
ALTER TABLE "userTouser" DROP COLUMN "friendsNotificationId";
