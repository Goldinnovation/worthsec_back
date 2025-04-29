import prisma from '../../libs/prisma';
import { Request, Response } from "express"


interface AuthenticatedRequest extends Request {
    user?: any
}








export async function getCurrentUserNotification(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {
        const currentUserId = req.user.userId

        if (!currentUserId) {
            res.status(200).json({ message: "Bad request - currentUserId is required" })
        }


        const notification = await prisma.notification.findMany({
            where: {
                currentUser_notified_Id: currentUserId
            }, include: {
                userTOuser: {
                    select: {
                        userFollowed: true
                    }
                }
            }
        })

        if (notification.length === 0) {
            res.status(200).json({ message: "User does not have any notifications" })
        } else {
            const followedUserId = notification.map((otherUsersId: any) => otherUsersId.userTOuser.userFollowed)
            handleCurrentUserConnection(currentUserId, followedUserId, req, res)
        }


    } catch (error) {
        console.log("Server Error on getUserNotification handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}





const handleCurrentUserConnection = async (currentUserId: any, followedUserId: string[], req: AuthenticatedRequest, res: Response) => {

    try {
        const checkUserConnection = await prisma.userTouser.findMany({
            where: {
                userRequested_id: currentUserId,
                userFollowed: {
                    in: followedUserId
                }
            }
        })

        handleOtherUserConnection(followedUserId, currentUserId, checkUserConnection, req, res)

    } catch (error) {

        console.log("Server Error on handleCurrentUserConnection handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });

    }




}



const handleOtherUserConnection = async (followedUserId: any, currentUserId: any, checkUserConnection: any, req: AuthenticatedRequest, res: Response) => {
    try {

        const otheruserId = checkUserConnection.map((otheruserId: any) => otheruserId.userFollowed)

        const checkOtherUserConnection = await prisma.userTouser.findMany({
            where: {
                userRequested_id: { in: otheruserId },
                userFollowed: currentUserId
            }
        })

        handleUpdateOfConnectionState(followedUserId, checkUserConnection, checkOtherUserConnection, req, res)

    } catch (error) {

        console.log("Server Error on handleOtherUserConnection handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

}





const handleUpdateOfConnectionState = async (followedUserId: string[], checkCurrentUserConnection: any, checkOtherUserConnection: any, req: AuthenticatedRequest, res: Response) => {

    try {

        const userconnectionId = checkCurrentUserConnection.map((connectionId: any) => connectionId.userTouserId)
        const otherUserconnectionId = checkOtherUserConnection.map((otherConnecitonId: any) => otherConnecitonId.userTouserId)


        const connectionStateCurrentUser = await Promise.all(checkCurrentUserConnection.map(async (currentUserState: any) => {
            await Promise.all(otherUserconnectionId.map(async (otherUserCurrentState: any) => {
                if (otherUserCurrentState.connection_status === currentUserState.connection_status) {
                    await prisma.userTouser.updateMany({
                        where: {
                            userTouserId: { in: userconnectionId }
                        },
                        data: {
                            connection_status: 2
                        }
                    });
        
                    await prisma.userTouser.updateMany({
                        where: {
                            userTouserId: { in: otherUserconnectionId }
                        },
                        data: {
                            connection_status: 2
                        }
                    });
        
                } else {
                    // Handle the case when connection statuses are different
                    handleOtherUsersData(followedUserId, req, res);
                }
            }));
        }));
        
    
        

        handleOtherUsersData(followedUserId, req, res)

    } catch (error) {
        console.log("Server Error on handleUpdateConnectionState handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

}




const handleOtherUsersData = async (followedId: any, req: AuthenticatedRequest, res: Response) => {

    try {
        const getOtherUser = await prisma.account.findMany({
            where: {
                userId: {
                    in: followedId
                },
            }, include: {
                picture: true
            }
        })

        res.status(200).json(getOtherUser)

    } catch (error) {

        console.log("Server Error on handleUpdateConnectionState handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });

    }


}

export default { getUserNotification: getCurrentUserNotification }