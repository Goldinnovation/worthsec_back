-- DropIndex
DROP INDEX "account_userEmail_idx";

-- CreateIndex
CREATE INDEX "account_userName_idx" ON "account"("userName");
