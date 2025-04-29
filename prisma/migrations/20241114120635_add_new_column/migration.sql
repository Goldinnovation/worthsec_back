-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "role" "Role" DEFAULT 'USER';
