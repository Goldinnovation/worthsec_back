-- CreateTable
CREATE TABLE "notification" (
    "notificationId" TEXT NOT NULL,
    "otherUserfollow_Id" TEXT NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("notificationId")
);

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_otherUserfollow_Id_fkey" FOREIGN KEY ("otherUserfollow_Id") REFERENCES "userTouser"("userTouserId") ON DELETE RESTRICT ON UPDATE CASCADE;
