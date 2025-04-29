/*
  Warnings:

  - Added the required column `eventHost` to the `eventPrompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventPrompt" ADD COLUMN     "eventHost" TEXT NOT NULL;
