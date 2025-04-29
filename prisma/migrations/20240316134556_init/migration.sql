/*
  Warnings:

  - You are about to drop the column `userTOuserNotified_id` on the `notification` table. All the data in the column will be lost.
  - Added the required column `userTouser_id` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_userTOuserNotified_id_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "userTOuserNotified_id",
ADD COLUMN     "userTouser_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userTouser_id_fkey" FOREIGN KEY ("userTouser_id") REFERENCES "userTouser"("userTouserId") ON DELETE RESTRICT ON UPDATE CASCADE;
