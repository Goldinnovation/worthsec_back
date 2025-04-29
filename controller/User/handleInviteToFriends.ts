import prisma from '../../libs/prisma';
import { Request, Response } from "express";



interface AuthenticatedRequest extends Request {
  user?: any
}

export async function checkForUsersCloseFriends(req: AuthenticatedRequest, res: Response): Promise<void> {

  try {

    const currentUser = req.user;

    if (!currentUser) {
      res.status(400).json({ message: "Bad Request: User data is required" })
      return
    }

    const userCloseFriends = await prisma.userTouser.findMany({
      where: {
        userRequested_id: currentUser.userId,
        connection_status: 2,
      },
    });

    if (userCloseFriends.length === 0) {
      res.status(200).json({ message: "user does not have any close friends" })
      return
    }

    getCloseFriendsAccData(userCloseFriends, req, res)
  } catch (error) {
    console.log("Server Error on checkForUsersCloseFriends handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const getCloseFriendsAccData = async (userCloseFriends: any, req: AuthenticatedRequest, res: Response) => {

  try {
    const arrobj = userCloseFriends.map((friendsId: any) => friendsId.userFollowed)
    const closefriendsData = await prisma.account.findMany({
      where: {
        userId: {
          in: arrobj
        }
      },
      include: {
        picture: true,
      },
    });

    res.status(200).json(closefriendsData);

  } catch (error) {
    console.log("Server Error on getCloseFriendsAccData handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export async function inviteClosefriendsToEvent(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {

    const userId = req.user.userId
    const eventId = req.body.eventIdData
    const friendsList = req.body.friendsDataList

    if (!userId) {
      res.status(400).json({ message: "Bad Request: userId is required" })
      return
    }

    if (!eventId) {
      res.status(400).json({ message: "Bad Request: eventId is required" })
      return
    }

    if (!friendsList) {
      res.status(400).json({ message: "Bad Request: friendsList data is required" })
      return
    }

    await prisma.invitation.create({
      data: {
        event_invitedTo_Id: eventId,
        otherUser_invited_Id: friendsList,
        currentUser_invite_Id: userId
      }
    })

    res.status(200).json({ message: "Friends are successfully invited" });

  } catch (error) {
    console.log("Server Error on inviteClosefriendsToEvent handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }

}

export default { inviteClosefriendsToEvent, checkForUsersCloseFriends }