/*
  Warnings:

  - A unique constraint covering the columns `[picture_owner_id]` on the table `picture` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "picture_picture_owner_id_key" ON "picture"("picture_owner_id");
