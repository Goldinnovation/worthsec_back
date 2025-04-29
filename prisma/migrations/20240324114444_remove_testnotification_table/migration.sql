-- CreateIndex
CREATE INDEX "event_eventHost_idx" ON "event"("eventHost");

-- CreateIndex
CREATE INDEX "picture_picture_owner_id_idx" ON "picture"("picture_owner_id");

-- CreateIndex
CREATE INDEX "userTouser_userRequested_id_userFollowed_idx" ON "userTouser"("userRequested_id", "userFollowed");
