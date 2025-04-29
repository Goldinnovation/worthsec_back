/*
  Warnings:

  - Added the required column `eventHostName` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "eventHostName" TEXT NOT NULL;
