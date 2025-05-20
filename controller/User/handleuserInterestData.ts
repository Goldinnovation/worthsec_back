import { NextFunction, Request, Response } from 'express';
import prisma from '../../libs/prisma';
import CustomError from '../../errors/customError';
import { getErrorMessage } from '../../utils';
import { Prisma } from '@prisma/client';




interface AuthenticatedRequest extends Request {
    user?: any
    decodedUserId: string
    userSelectedInterests: string[]
}

interface UserInterestData {
    userId: string;
    interests: string[];
}


// Define error codes 
enum ErrorCodes {
    INVALID_USER_ID = 'INVALID_USER_ID',
    INVALID_INTERESTS = 'INVALID_INTERESTS',
    DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    MISSING_DATA = 'MISSING_DATA'
}


// Validation function
const validateRequest = (userId: string | undefined, selectedInterests: any): UserInterestData => {
    // Check if userId exists and is not undefined
    if (!userId || typeof userId !== 'string') {
        throw new CustomError(
            'Invalid Request: userId is required and must be a string',
            400,
            ErrorCodes.INVALID_USER_ID
        );
    }

    // Check if selectedInterests exists
    if (!selectedInterests) {
        throw new CustomError(
            'Invalid Request: selectedInterests is required',
            400,
            ErrorCodes.MISSING_DATA
        );
    }

    // Validate array content
    if (!Array.isArray(selectedInterests) || selectedInterests.length === 0) {
        throw new CustomError(
            'Invalid Request: selectedInterests must be a non-empty array',
            400,
            ErrorCodes.INVALID_INTERESTS
        );
    }

    // Validate each interest is a string
    if (!selectedInterests.every((interest: any) => typeof interest === 'string')) {
        throw new CustomError(
            'Invalid Request: all interests must be strings',
            400,
            ErrorCodes.INVALID_INTERESTS
        );
    }

    return {
        userId: userId.trim(),
        interests: selectedInterests
    };
}



// Creates the user interest object
const createUserInterest = async (userData: UserInterestData, next: NextFunction) => {
    try {
        const result = await prisma.userInterest.create({
            data: {
                user_interest_id: userData.userId,
                interest_list: userData.interests
            }
        });
        return result;
    } catch (error) {
        next(error);
    }
}

// Returns the success response
const successResponse = (data: any) => {
    return {
        success: true,
        message: "Interests are successfully stored",
        data: {
            userId: data.user_interest_id,
            interests: data.interest_list
        }
    };
}


// Stores the user interest data
const storeInterestData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthenticatedRequest)?.decodedUserId
        const selectedInterests = req.body.pickedIntesrest

        // Validates the request
        const validatedData = validateRequest(userId, selectedInterests);

        // Creates the user interest object
        const result = await createUserInterest(validatedData, next)

        // Returns the success response
        res.status(200).json(successResponse(result))
    }
    catch (error) {
       
        next(error);
    }
}

export default storeInterestData
