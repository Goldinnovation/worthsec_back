-- CreateTable
CREATE TABLE "picture" (
    "id" TEXT NOT NULL,
    "pictureId" TEXT,
    "profilPicOwnerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_profilPicOwnerId_fkey" FOREIGN KEY ("profilPicOwnerId") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
