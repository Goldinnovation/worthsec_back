/*
  Warnings:

  - The primary key for the `picture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `picture` table. All the data in the column will be lost.
  - The required column `pictureId` was added to the `picture` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "picture" DROP CONSTRAINT "picture_pkey",
DROP COLUMN "id",
ADD COLUMN     "pictureId" TEXT NOT NULL,
ADD CONSTRAINT "picture_pkey" PRIMARY KEY ("pictureId");
