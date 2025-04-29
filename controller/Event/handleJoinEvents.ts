import prisma from '../../libs/prisma';
import { Response, Request } from "express";




/**
 * Purpose Statement--userJoinEvent
 * The function allows the current user to join an Event. 
 *
*/


/**
 * Function Signature--userJoinEvent
 * @param {string} userId - The value represents the current user ID.
 * @param {string} eventId - The value represents the event ID that the user selected.
 * @returns {string} Returns a json message that the operation was successful 
*/




interface AuthenticatedRequest extends Request{
    user?: any
}


async function userJoinEvent(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {

        const userId = req.user.userId
        const eventId = req.body.joinEventId


        if (!userId || userId === undefined || userId === " ") {
            res.status(400).json({ message: 'Invalid Request, userId is required' });
            return;
        }

        if (!eventId) {
            res.status(400).json({ message: 'Invalid Request, eventId is required' });
            return;
        }


        await prisma.userJoinEvent.create({
            data:
            {
                user_id: userId,
                event_id: eventId
            }
        })

        res.status(200).json({ message: "User has successfully join an event" })



    } catch (error) {
        console.log("Server Error on userJoinEvent handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });

    }

}


export default userJoinEvent;
