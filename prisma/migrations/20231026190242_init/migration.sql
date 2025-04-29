/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "account_userName_key" ON "account"("userName");
