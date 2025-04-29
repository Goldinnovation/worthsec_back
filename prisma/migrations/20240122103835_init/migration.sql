-- CreateTable
CREATE TABLE "userTouser" (
    "userTouserId" TEXT NOT NULL,
    "userRequested_id" TEXT NOT NULL,
    "userFollowed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userTouser_pkey" PRIMARY KEY ("userTouserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "userTouser_userRequested_id_key" ON "userTouser"("userRequested_id");

-- AddForeignKey
ALTER TABLE "userTouser" ADD CONSTRAINT "userTouser_userRequested_id_fkey" FOREIGN KEY ("userRequested_id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
