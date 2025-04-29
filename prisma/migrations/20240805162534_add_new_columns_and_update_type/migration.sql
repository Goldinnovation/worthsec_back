/*
  Warnings:

  - Added the required column `cityType` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventAddress` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventZipcode` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedRangeofEvents` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "cityType" TEXT NOT NULL,
ADD COLUMN     "eventAddress" TEXT NOT NULL,
ADD COLUMN     "eventZipcode" INTEGER NOT NULL,
ADD COLUMN     "selectedRangeofEvents" INTEGER NOT NULL,
ALTER COLUMN "eventType" SET DATA TYPE TEXT;
