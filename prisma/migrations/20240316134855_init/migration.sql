/*
  Warnings:

  - You are about to drop the column `currentUser_Id` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `userTouser_id` on the `notification` table. All the data in the column will be lost.
  - Added the required column `currentUser_notified_Id` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTouser_connection_id` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_currentUser_Id_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_userTouser_id_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "currentUser_Id",
DROP COLUMN "userTouser_id",
ADD COLUMN     "currentUser_notified_Id" TEXT NOT NULL,
ADD COLUMN     "userTouser_connection_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_currentUser_notified_Id_fkey" FOREIGN KEY ("currentUser_notified_Id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userTouser_connection_id_fkey" FOREIGN KEY ("userTouser_connection_id") REFERENCES "userTouser"("userTouserId") ON DELETE RESTRICT ON UPDATE CASCADE;
