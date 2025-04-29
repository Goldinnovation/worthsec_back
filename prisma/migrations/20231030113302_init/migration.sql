/*
  Warnings:

  - Added the required column `userPassword2` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "userPassword2" TEXT NOT NULL;
