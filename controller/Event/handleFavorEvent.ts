import prisma from '../../libs/prisma';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Purpose Statement--userFavourEvent
 * The function allows the current user to favour an Event. 
 * Furthermore it gives the user the ability to store and retrieve the data for a period of time.



/**
 * Function Signature--userFavourEvent
 * 
 * @param {string} currentUserId - The value represents the ID of the current user that favoured the Event.
 * @param {string} favour_event_Id - The value represents the ID of the Event that was favoured by the user.
 * @returns {string} Returns a statement that the user was successfully stored in the userFavourEvent table.
 */







interface AuthenticatedRequest extends Request {
    user?: any
    decodedUserId: any

}









export async function userFavorsEvent(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as AuthenticatedRequest)?.decodedUserId;
        const eventId = req.body?.favoreventId;


        if (userId === undefined) {
            res.status(400).json({ message: 'Invalid Request, userId does not exist' });
            return
        }

        if (eventId === " " || eventId === undefined) {
            res.status(400).json({ message: 'Invalid Request: event Id does not match the requirements' });
            return
        }

        await prisma.userFavourEvent.create({
            data:
            {
                currentUser_id: userId,
                event_id: eventId
            }
        })

        res.status(200).json({ message: "User successfully favored an event" })


    } catch (error) {
        console.log("Server Error on userFavorEventMobile handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });

    }


}












export async function getUserFavoredEvents(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as AuthenticatedRequest)?.decodedUserId;


        if (userId === undefined || userId === " ") {
            res.status(400).json({ message: 'Invalid Request, userId does not exist' });
            return
        }




        const favoredEvent = await prisma.userFavourEvent.findMany({
            where: {
                currentUser_id: userId
            },
        })

        getEventDetails(favoredEvent, res)






    } catch (error) {
        console.log("Server Error on getUserFavoredEvents handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

}












export const getEventDetails = async (getFavoredEventId: any, res: Response) => {

    try {
        if (getFavoredEventId.length === 0) {
            res.status(400).json({ message: 'Invalid Request, getFavoredEventId date is missing' });
            return
        }

        const favoredEventsArr: any[] = []

        const promiseEventData = getFavoredEventId.map(async (selectedEvents: any) => {
            const retrieveData = await prisma.event.findMany({
                where: {
                    eventId: selectedEvents.event_id
                }
            })
            favoredEventsArr.push(...retrieveData)
        }

        )

        await Promise.all(promiseEventData)


        res.status(200).json(favoredEventsArr)

    } catch (error) {
        console.log("Server Error on findsEventsUserFavored handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

}



export default { userFavorEventMobile: userFavorsEvent, getUserFavoredEvents }