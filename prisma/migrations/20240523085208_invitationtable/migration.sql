/*
  Warnings:

  - You are about to drop the column `curentUser_invite_Id` on the `invitation` table. All the data in the column will be lost.
  - Added the required column `currentUser_invite_Id` to the `invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invitation" DROP CONSTRAINT "invitation_curentUser_invite_Id_fkey";

-- AlterTable
ALTER TABLE "invitation" DROP COLUMN "curentUser_invite_Id",
ADD COLUMN     "currentUser_invite_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_currentUser_invite_Id_fkey" FOREIGN KEY ("currentUser_invite_Id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
