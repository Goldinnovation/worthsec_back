/*
  Warnings:

  - Added the required column `currentUser_Id` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "currentUser_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_currentUser_Id_fkey" FOREIGN KEY ("currentUser_Id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
