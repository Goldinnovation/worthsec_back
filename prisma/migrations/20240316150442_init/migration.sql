/*
  Warnings:

  - The primary key for the `userJoinEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Joinid` on the `userJoinEvent` table. All the data in the column will be lost.
  - The required column `JoinId` was added to the `userJoinEvent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "userJoinEvent" DROP CONSTRAINT "userJoinEvent_pkey",
DROP COLUMN "Joinid",
ADD COLUMN     "JoinId" TEXT NOT NULL,
ADD CONSTRAINT "userJoinEvent_pkey" PRIMARY KEY ("JoinId");
