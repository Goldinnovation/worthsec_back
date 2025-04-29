import prisma from '../../libs/prisma';
import { Request, Response } from "express";

/** 
 * Purpose Statement--searchforClosefriends
 *The searchforClosefriends function receives a queried body and checks if the user exist in the account database table. 
  If the user exist in the account table the function will return an object with the other users information. 
  Based on this term another condition will be executed which checks if both users have the same status of 2. 
  If the requirement is true the function will return an Id object of the other user

/**
 * Function Signature--searchforClosefriends
 * @param {string} currentUser - represents the current user's Id
 * @param {body} body - represents the queried data 
 * @returns {body} Returns the other user's ID
 */



interface AuthenticatedRequest extends Request {
    user?: any
}



export async function searchforClosefriends(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const currentUserId = req.user.userId
        const friendsId = req.body.searchfriendsvalue


        if (!currentUserId || currentUserId === undefined || currentUserId === " ") {
            res.status(400).json({ message: 'Invalid Request, currentUserId is invalid' });
        }

        if (!friendsId) {
            res.status(400).json({ message: 'Invalid Request: friendsId is invalid' });
        }


        const getFriendDetails = await prisma.account.findUnique({
            where: {
                userName: friendsId
            }
        })

        await handlegetConnectionState(getFriendDetails, currentUserId, req, res)

    } catch (error) {
        console.log("Server Error on searchforClosefriends handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }




}





const handlegetConnectionState = async (getFriendDetails: any, currentUserId: any, req: AuthenticatedRequest, res: Response) => {


    try {
        const closefriendsconnection = await prisma.userTouser.findMany({
            where: {
                userRequested_id: currentUserId,
                userFollowed: getFriendDetails.userId,
                connection_status: 2
            },
        });

        res.status(200).json(closefriendsconnection);
    } catch (error) {
        console.log("Server Error on handlegetConnectionState handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });

    }



}






/** 
 * Purpose Statement--searchImgUrl
 *The searchImgUrl function receives the other user Id as an object and queries with it the image url from pictures database table. 
  If the image Url exist the query will return an object with url
  

/**
 * Function Signature--searchImgUrl
 * @param {string} otherUserId - represents the other user's Id
 * @returns {body} Returns an image url object.
 */



export async function searchImgUrl(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {
        const otherUserId = req.params.id

        if (!otherUserId || otherUserId === undefined || otherUserId === " ") {
            res.status(400).json({ message: 'Invalid Request, otherUserId is required' });
        }

        const otherUserData = await prisma.account.findUnique({
            where: {
                userId: otherUserId
            }, include: {
                picture: true
            }

        })

        res.status(200).json([otherUserData])


    } catch (error) {
        console.log("Server Error on searchImgUrl handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

}



export default { searchImgUrl, searchforClosefriends }