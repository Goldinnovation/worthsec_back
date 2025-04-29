-- CreateTable
CREATE TABLE "invitation" (
    "invitationId" TEXT NOT NULL,
    "curentUser_invite_Id" TEXT NOT NULL,
    "event_invitedTo_Id" TEXT NOT NULL,
    "otherUser_invited_Id" TEXT[],

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("invitationId")
);

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_curentUser_invite_Id_fkey" FOREIGN KEY ("curentUser_invite_Id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_event_invitedTo_Id_fkey" FOREIGN KEY ("event_invitedTo_Id") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;
