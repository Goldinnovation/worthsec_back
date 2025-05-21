import prisma from '../../libs/prisma';
import { Response, Request, NextFunction } from "express";
import CustomError from '../../errors/customError';



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



enum ErrorCodes {
    INVALID_USER_ID = 'INVALID_USER_ID',
    INVALID_EVENT_ID = 'INVALID_EVENT_ID',
    MISSING_DATA = 'MISSING_DATA',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}



const validateRequest = (userId: string, eventId: string, res: Response) => {

    if (!userId || userId === undefined || userId === " " || typeof userId !== 'string' || userId === null || userId === "") {
        throw new CustomError(
            'Invalid Request: userId is required and must be a string',
            400,
            ErrorCodes.INVALID_USER_ID,
            'validateRequest'
        );
    }

    if (!eventId || eventId === undefined || eventId === " " || typeof eventId !== 'string' || eventId === null || eventId === "") {
        throw new CustomError(
            'Invalid Request: userId is required and must be a string',
            400,
            ErrorCodes.INVALID_EVENT_ID,
            'validateRequest'
        );
    }

    return {
        userId: userId.replace(/[<>]/g, '').trim(),
        eventId: eventId.replace(/[<>]/g, '').trim()
    }
}

async function userJoinEvent(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {

        const userId = req.user.userId
        const eventId = req.body.joinEventId


        // Validate the request data
        const validatedRequestData = validateRequest(userId, eventId, res)

        const cleanedUserId = validatedRequestData.userId
        const cleanedEventId = validatedRequestData.eventId

        await prisma.userJoinEvent.create({
            data:
            {
                user_id: cleanedUserId,
                event_id: cleanedEventId
            }
        })

        res.status(200).json({ message: "User has successfully join an event" })



    } catch (error) {

        if (error instanceof CustomError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                code: error.code,
                functionName: "userJoinEvent",
            
            });
            return
        }
        next(error)
    }

}


export default userJoinEvent;
