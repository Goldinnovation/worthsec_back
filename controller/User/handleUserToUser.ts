import prisma from '../../libs/prisma';
import { Request, Response } from "express"


/** 
 * Purpose Statement--searchUser_friends
 * 
 * The searchUser_friends handler retrieves information from the "userToUser" database table
 * to determine if there is a connection between the two users. If a connection is found, it returns
 * a "userToUser" record object.
*/



/**
 * Function Signature--searchUser_friends
 * 
 * @param {string} currentUser - The ID of the current user online.
 * @param {string} otherUserId - The ID of the user to check for a connection
 * @returns {object|null} Returns a userTouser record object, otherwise it returns null.
 */


interface AuthenticatedRequest extends Request{
    user?: any
}



export async function searchUser_friends (req: AuthenticatedRequest, res: Response): Promise<void>{
    try {
        const currentUserId = req.user.userId
        const otherUserId = await req.params.id

        if (!currentUserId) {
            res.status(400).json({ message: 'Invalid Request, currentUserId is required' });
            return;
        }

        if (!otherUserId) {
            res.status(400).json({ message: 'Invalid Request, otherUserId is required' });
            return;
        }

        const checksIfUsersAreFriends = await prisma.userTouser.findMany({
            where: {
                userRequested_id: currentUserId,
                userFollowed: otherUserId,
            },
            include: {
                notification: {
                    select: {
                        notificationId: true
                    }
                }
            }
        })
        res.status(200).json(checksIfUsersAreFriends)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Bad request handler by searchUser_friends" })
    }

}

// -------------------------------------------------------------------------------------------------------------------------







/**
 * Purpose Statement -- followUser & checksIfUserFollowEachOther
 * 
 * The followUser function checks if the current user has a record with the other user in the "userToUser" database table.
 * 
 * If the record exists, the function responds with a message that confirms the connection between the currentUser and the other user.
 * 
 * If the connection is null, the checksIfUserFollowEachOther function will create a new record in both the "userToUser" and "notification" database tables.
 * 
 */

/**
 * Function Signature -- followUser & checksIfUserFollowEachOther
 * 
 * @param {string} currentUser - The ID of the current user who sent the follow request.
 * @param {string} otherUserId - The ID of the user to be followed.
 * @returns {json} - Returns a JSON message describing the state of the connection.
 */


export async function followUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const currentUserId = req.user.userId
        const otherUserId = req.body.userIdData

        if (!currentUserId) {
            res.status(400).json({ message: 'Invalid Request, currentUserId is required' });
            return;
        }

        if (!otherUserId) {
            res.status(400).json({ message: 'Invalid Request, otherUserId is required' });
            return;
        }

        const userFriendState = await prisma.userTouser.findFirst({
            where: {
                userRequested_id: currentUserId,
                userFollowed: otherUserId

            }
        })

        checksIfUserFollowEachOther(userFriendState, req, res)



    } catch (error) {
        console.log("Server Error on followUser handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}





const checksIfUserFollowEachOther = async (userFriendState: any, req: AuthenticatedRequest, res: Response) => {

    try {
        const currentUserId = req.user.userId
        const otherUserId = req.body.userIdData


        if (userFriendState) {
            res.status(200).json({ message: "Current user follows already other user" })
            return;
        }

        const createUserasFriend = await prisma.userTouser.create({
            data: {
                userRequested_id: currentUserId,
                userFollowed: otherUserId,
                connection_status: 1
            }
        })

        await prisma.notification.create({
            data: {
                currentUser_notified_Id: otherUserId,
                userTouser_connection_id: createUserasFriend.userTouserId
            }
        })

        res.status(200).json({ message: "currentUser follows now other user"})


    } catch (error) {
        console.log("Server Error on checksIfUserFollowEachOther handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }


}








// -------------------------------------------------------------------------------------------------------------------------


/**
 * Purpose Statement --unFollowUser & deleteUserConnection
 * 
 * The unFollowUser function first deletes the notification record ID that emphasizes the connection between the current user and the other user from the "notification" database table.
 * Afterwards, the deleteUserConnection function deletes the unique userToUserId from the "userToUser" database table, which represents the connection between both users.
 */



/**
 * Function Signature--unFollowUser
 * 
 * @param {string} userConnection_id - The ID representing the connection between both users.
 * @param {string} notificationId - The ID of the notification created after the current user followed the other user.
 * @returns {json} - Returns a JSON message describing the deletion status.
 */


export async  function unFollowUser  (req: AuthenticatedRequest, res: Response): Promise<void> {
    try {

    const userConnectionId = req.body.unFollowUserId
    const notificationId = req.body.userNotificationId

    if (!userConnectionId) {
        res.status(200).json({ message: "Bad request - unfollowedUserId is invalid" })
        return;
    }
    if (!notificationId) {
        res.status(200).json({ message: "Bad request - userNotificationId is invalid" })
        return;
    }
      
    await prisma.notification.delete({
                where: {
                    notificationId: notificationId
                }
            })
          
    deleteUserConnection(userConnectionId, req, res)

    } catch (error) {
        console.log("Server Error on unFollowUser handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });

    }
}




const deleteUserConnection =  async(userConnectionId: string,req: AuthenticatedRequest, res: Response) => {

    try { 
        await prisma.userTouser.delete({
            where: {

                userTouserId: userConnectionId
            }
        })
    
    res.status(200).json({ message: "User unFollowed user" })

    }
    catch(error){
        console.log("Server Error on deleteUserConnection handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

   
}


export default {unFollowUser, followUser, searchUser_friends}