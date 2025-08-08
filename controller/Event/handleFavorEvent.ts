import prisma from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import createErrorWithContext from '../../utils/errorWithContext';
import CustomError from '../../errors/customError';
import { AugmentedRequest } from 'express-rate-limit';

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
    user?: any; 
    // decodedUserId: string;
  

}


interface UserfavoredData {
    userId: string;
    eventId: string;
}

enum ErrorCodes {
    INVALID_USER_ID = 'INVALID_USER_ID',
    INVALID_INTERESTS = 'INVALID_INTERESTS',
    DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    MISSING_DATA = 'MISSING_DATA',
    FAVORED_EVENT_ID_MISSING = 'FAVORED_EVENT_ID_MISSING'
}





// Validate Request
const validateRequest = (userId: string | undefined, favoredEventId: any): UserfavoredData => {
    

    if (!userId || typeof userId !== 'string' || userId === " " || userId === undefined) {
        throw new CustomError(
            'Invalid Request: userId is required and must be a string',
            400,
            ErrorCodes.INVALID_USER_ID,
            'validateRequest'
        );
    }

    if (!favoredEventId || typeof favoredEventId !== 'string' || favoredEventId === " " || favoredEventId === undefined) {
        throw new CustomError(
            'Invalid Request: userId is required and must be a string',
            400,
            ErrorCodes.FAVORED_EVENT_ID_MISSING,
            'validateRequest'
        );
    }
   

    return {
        userId: userId.replace(/[<>]/g, '').trim(),
        eventId: favoredEventId.replace(/[<>]/g, '').trim()
    };
}


// Validate User ID
const validateUserId = (userId: string | undefined, res: Response) => {
    console.log('userId on validUserId', userId);
    if (userId === undefined || userId === " " || userId === null || userId === "" || typeof userId !== 'string') {
        res.status(400).json({ message: 'Invalid Request, userId does not exist' });
        return
    }
    return {
        userId: userId.replace(/[<>]/g, '').trim()}
}


// Validate Favored Events Data
const validateFavoredEventsData = (favoredEventsData: any) => {
    if (favoredEventsData.length === 0 || favoredEventsData === null || favoredEventsData === undefined) {
        throw new CustomError(
            'Invalid Request: getFavoredEventId date is missing',
            400,
            ErrorCodes.FAVORED_EVENT_ID_MISSING,
            'validateFavoredEventsData'
        );
    }
}





// ------------------------------------------------------------

// Upload Favor Event - side function
const uploadFavorEvent = async (userId: string, eventId: string) => {
   
        const uploadFavorEventData = await prisma.userFavourEvent.create({
            data: {
                currentUser_id: userId,
                event_id: eventId
            }
        })
        return uploadFavorEventData
   
}



// ------------------------------------------------------------

// Handle Favor Event main function - POST Method 
export async function userFavorsEvent(req: AuthenticatedRequest , res: Response, next: NextFunction): Promise<void> {
    try {
        // const userId = (req as AuthenticatedRequest)?.decodedUserId ;
        const userId = req.user.userId
        const eventId = req.body?.favoreventId;

        // Validate Request
        const validatedData = validateRequest(userId, eventId)

        const cleanedUserId = validatedData.userId;
        const cleanedEventId = validatedData.eventId;

        // Upload Cleaned Data to Database
        await uploadFavorEvent(cleanedUserId, cleanedEventId)


        res.status(200).json({ message: "User successfully favored an event" })


    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({
               success: false,
               message: error.message,
               code: error.code,
               functionName: error.functionName
             
           });
           return
       }
    //    next(error);

    }


}






//  Event Details - main function - GET Method
export const getEventDetails = async (getFavoredEventId: any, res: Response) => {

    try {
       
        validateFavoredEventsData(getFavoredEventId)

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

        // console.log('favoredEventsArr',favoredEventsArr);
        res.status(200).json(favoredEventsArr)

    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({
               success: false,
               message: error.message,
               code: error.code,
             
           });
           return
       }
    //    next(error);

    }

}




// Get User Favored Events - main function
export async function getUserFavoredEvents(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        // const userId = (req as AuthenticatedRequest)?.decodedUserId;
        const userId = req.user.userId

        console.log('userId on Auth', userId);
       const validatedUserId = validateUserId(userId, res)

       const cleanedUserId = validatedUserId?.userId



        const favoredEvent = await prisma.userFavourEvent.findMany({
            where: {
                currentUser_id: cleanedUserId
            },
        })

        console.log('favoredEvent', favoredEvent);
        getEventDetails(favoredEvent, res)

    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({
               success: false,
               message: error.message,
               code: error.code,
               functionName: error.functionName
           });
           return
       }
    //    next(error);
    //    return; 
       

    }

}












export default { userFavorEventMobile: userFavorsEvent, getUserFavoredEvents }