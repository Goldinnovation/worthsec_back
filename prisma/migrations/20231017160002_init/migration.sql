/*
  Warnings:

  - The primary key for the `eventPrompt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `eventPrompt` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `eventType` on the `eventPrompt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "eventPrompt" DROP CONSTRAINT "eventPrompt_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "eventType",
ADD COLUMN     "eventType" INTEGER NOT NULL,
ADD CONSTRAINT "eventPrompt_pkey" PRIMARY KEY ("id");
