-- CreateTable
CREATE TABLE "eventPrompt" (
    "id" TEXT NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "eventType" INTEGER NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventDescriptionContent" TEXT NOT NULL,
    "eventTime" TEXT NOT NULL,
    "ImageCoverUpload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventPrompt_pkey" PRIMARY KEY ("id")
);
