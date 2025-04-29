/*
  Warnings:

  - You are about to drop the column `userStatus` on the `userTouser` table. All the data in the column will be lost.
  - Added the required column `connection_status` to the `userTouser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userTouser" DROP COLUMN "userStatus",
ADD COLUMN     "connection_status" INTEGER NOT NULL;
