import prisma from '../../libs/prisma';
import { Request, Response } from 'express';





/**
 * Purpose Statement-- updatetoNewEventData
 * The handler function receives an array of event IDs and checks for other event IDs that do not match those.
*/


/**
 * Function Signature--userFavourEvent
 * @param {string} userId - The value represents the current user ID.
 * @param {string} eventIds - The value represents the a list of event IDs.
 * @returns {string} Returns a list of Events that matches the requirements 
*/



interface AuthenticatedRequest extends Request {
  user?: any
  decodedUserId: any

}




export async function updatetoNewEventData(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as AuthenticatedRequest)?.decodedUserId;
    const eventIds = req.body?.EventDataId;

    if (!userId || userId === "undefined" || userId === " ") {
      res.status(400).json({ message: 'Invalid Request, userId does not exist' });
      return
    }


    if (!eventIds || eventIds.length !== 24) {
      res.status(400).json({ message: 'Invalid Request: eventId length does not match the requirements' });
      return
    }


    const newEventData = await prisma.event.findMany({
      where: {
        eventId: {
          notIn: eventIds,
        },
      },
      take: 27,
    });

    res.status(200).json(newEventData)




  } catch (error) {

    console.log("Server Error on updatetoNewEventData handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error"});
  }
}





export default updatetoNewEventData 