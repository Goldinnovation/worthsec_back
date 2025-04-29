-- DropIndex
DROP INDEX "account_userName_idx";

-- CreateIndex
CREATE INDEX "account_userEmail_idx" ON "account"("userEmail");
