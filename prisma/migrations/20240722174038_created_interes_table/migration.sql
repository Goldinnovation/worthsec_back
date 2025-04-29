-- CreateTable
CREATE TABLE "userInterest" (
    "IntersetId" TEXT NOT NULL,
    "user_interest_id" TEXT NOT NULL,
    "interest_list" TEXT[],

    CONSTRAINT "userInterest_pkey" PRIMARY KEY ("IntersetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "userInterest_user_interest_id_key" ON "userInterest"("user_interest_id");

-- AddForeignKey
ALTER TABLE "userInterest" ADD CONSTRAINT "userInterest_user_interest_id_fkey" FOREIGN KEY ("user_interest_id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
