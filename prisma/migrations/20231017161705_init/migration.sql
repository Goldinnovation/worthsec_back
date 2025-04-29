/*
  Warnings:

  - The primary key for the `eventPrompt` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "eventPrompt" DROP CONSTRAINT "eventPrompt_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "eventPrompt_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "eventPrompt_id_seq";
