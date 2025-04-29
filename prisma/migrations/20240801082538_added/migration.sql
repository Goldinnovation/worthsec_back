-- DropForeignKey
ALTER TABLE "invitation" DROP CONSTRAINT "invitation_currentUser_invite_Id_fkey";

-- DropForeignKey
ALTER TABLE "userFavourEvent" DROP CONSTRAINT "userFavourEvent_currentUser_id_fkey";

-- DropForeignKey
ALTER TABLE "userJoinEvent" DROP CONSTRAINT "userJoinEvent_user_id_fkey";

-- AddForeignKey
ALTER TABLE "userJoinEvent" ADD CONSTRAINT "userJoinEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFavourEvent" ADD CONSTRAINT "userFavourEvent_currentUser_id_fkey" FOREIGN KEY ("currentUser_id") REFERENCES "account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_currentUser_invite_Id_fkey" FOREIGN KEY ("currentUser_invite_Id") REFERENCES "account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
