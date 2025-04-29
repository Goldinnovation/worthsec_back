/*
  Warnings:

  - Added the required column `userTOuserNotified_id` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "userTOuserNotified_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userTOuserNotified_id_fkey" FOREIGN KEY ("userTOuserNotified_id") REFERENCES "userTouser"("userTouserId") ON DELETE RESTRICT ON UPDATE CASCADE;
