/*
  Warnings:

  - You are about to drop the column `otherUserfollow_Id` on the `notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_otherUserfollow_Id_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "otherUserfollow_Id";
