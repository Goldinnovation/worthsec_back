/*
  Warnings:

  - You are about to drop the column `pictureId` on the `picture` table. All the data in the column will be lost.
  - You are about to drop the column `profilPicOwnerId` on the `picture` table. All the data in the column will be lost.
  - Added the required column `picture_owner_id` to the `picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "picture" DROP CONSTRAINT "picture_profilPicOwnerId_fkey";

-- AlterTable
ALTER TABLE "picture" DROP COLUMN "pictureId",
DROP COLUMN "profilPicOwnerId",
ADD COLUMN     "pictureUrl" TEXT,
ADD COLUMN     "picture_owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_picture_owner_id_fkey" FOREIGN KEY ("picture_owner_id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
