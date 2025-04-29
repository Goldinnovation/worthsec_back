



import { NextFunction, Request, Response } from 'express';
import prisma from '../../libs/prisma';




interface AuthenticatedRequest extends Request{
    user?: any
    decodedUserId: any
    userSelectedInterests: any
}






async function  handleUserQrRequest(req: Request, res: Response, next: NextFunction ) : Promise<void> {
    try{


    const currentUserId = (req as AuthenticatedRequest)?.decodedUserId
    if (!currentUserId || currentUserId === undefined || currentUserId === " ") {
        res.status(400).json({ message: 'Invalid Request, currentUserId is required' });
        return;
    }

    const getUserData = await prisma.account.findUnique({
        where: {
            userId: currentUserId
        }, include: {
            picture: {
                select: {
                    pictureUrl: true, 
                    gifUrl: true
                }
            }
        }
    })
    console.log("getUserData", getUserData);
    res.status(200).json(getUserData)

    }catch(error){
        console.log("Server Error on handleUserQrRequest  handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }



    

 }


export default handleUserQrRequest
