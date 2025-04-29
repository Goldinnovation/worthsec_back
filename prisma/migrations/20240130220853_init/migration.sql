-- CreateTable
CREATE TABLE "userJoinEvent" (
    "Joinid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userJoinEvent_pkey" PRIMARY KEY ("Joinid")
);

-- CreateTable
CREATE TABLE "userFavorEvent" (
    "favorid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userFavorEvent_pkey" PRIMARY KEY ("favorid")
);

-- AddForeignKey
ALTER TABLE "userJoinEvent" ADD CONSTRAINT "userJoinEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userJoinEvent" ADD CONSTRAINT "userJoinEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "eventPrompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavorEvent" ADD CONSTRAINT "userFavorEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavorEvent" ADD CONSTRAINT "userFavorEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "eventPrompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
