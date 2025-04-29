/*
  Warnings:

  - Added the required column `userStatus` to the `userTouser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userTouser" ADD COLUMN     "userStatus" INTEGER NOT NULL;
