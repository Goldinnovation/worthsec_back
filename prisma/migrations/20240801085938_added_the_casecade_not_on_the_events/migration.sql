-- DropForeignKey
ALTER TABLE "invitation" DROP CONSTRAINT "invitation_currentUser_invite_Id_fkey";

-- DropForeignKey
ALTER TABLE "invitation" DROP CONSTRAINT "invitation_event_invitedTo_Id_fkey";

-- DropForeignKey
ALTER TABLE "userFavourEvent" DROP CONSTRAINT "userFavourEvent_currentUser_id_fkey";

-- DropForeignKey
ALTER TABLE "userFavourEvent" DROP CONSTRAINT "userFavourEvent_event_id_fkey";

-- DropForeignKey
ALTER TABLE "userJoinEvent" DROP CONSTRAINT "userJoinEvent_event_id_fkey";

-- DropForeignKey
ALTER TABLE "userJoinEvent" DROP CONSTRAINT "userJoinEvent_user_id_fkey";

-- AddForeignKey
ALTER TABLE "userJoinEvent" ADD CONSTRAINT "userJoinEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userJoinEvent" ADD CONSTRAINT "userJoinEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavourEvent" ADD CONSTRAINT "userFavourEvent_currentUser_id_fkey" FOREIGN KEY ("currentUser_id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavourEvent" ADD CONSTRAINT "userFavourEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_currentUser_invite_Id_fkey" FOREIGN KEY ("currentUser_invite_Id") REFERENCES "account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_event_invitedTo_Id_fkey" FOREIGN KEY ("event_invitedTo_Id") REFERENCES "event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;
