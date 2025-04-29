/*
  Warnings:

  - Made the column `pictureUrl` on table `picture` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "picture" ALTER COLUMN "pictureUrl" SET NOT NULL;
