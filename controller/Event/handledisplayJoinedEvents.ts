import prisma from '../../libs/prisma';
import { Request, Response } from 'express';


/** 
 * Purpose Statement--DisplayUserofJoinEvents
 * The function allows the current user to retrieve the Event's Id that is stored the userJoinEvent database table. 
 *
/**
 * Function Signature--DisplayUserofJoinEvents
 * @param {string} currentUser - represents the currend User Id
 * @returns {object} Returns an array of evenids. 
 */


interface AuthenticatedRequest extends Request{
    user?: any
}




export async function getUserJoinedEvents(req: AuthenticatedRequest,res: Response): Promise<void> {

     try{
        const currentUser = req.user.userId

        console.log('currentUser',currentUser);
        if (!currentUser) {
            res.status(400).json({ message: "Bad Request: currentUser data is invalid" });
        }
     
        const joinedUserId =  await prisma.userJoinEvent.findMany({
                where: {
                    user_id: currentUser
                }
            })
            res.status(200).json(joinedUserId)
        

     }catch(error){
        console.log("Server Error on getUserJoinedEvents handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });

     }



}




export default {getUserJoinedEvents}