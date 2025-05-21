import prisma from '../../libs/prisma';
import { Request, Response, NextFunction } from "express";
import CustomError from '../../errors/customError';

/**
 * Purpose Statement--searchUserbyUser
 *  The searchUserbyUser handler allows the current user to retrieve the other users data.
 *  By typing the other users name on the client side, the handler logic will use the request to retrieve the searched picture object from the database
 *
 */

/**
 * Function Signature--searchUserbyUser
 *
 * @param {string} searchUserName - Types value from the client side.
 * @returns {object} Returns an object of the other user from the database account table.
 */



interface AuthenticatedRequest extends Request {
  user?: any
  searchUserName: string
}

enum ErrorCodes {
  INVALID_REQUEST = 'INVALID_REQUEST',
  MISSING_DATA = 'MISSING_DATA',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}




const validateRequest = (searchUserName: string, res: Response) => {

  if (!searchUserName || typeof searchUserName !== 'string' || searchUserName == " " || searchUserName == "") {
    throw new CustomError(
      'Invalid Request: userId is required and must be a string',
      400,
      ErrorCodes.INVALID_REQUEST,
      'validateRequest'
  );
  }

  return {
    searchUserName: searchUserName.replace(/[<>]/g, '').trim()
  }

}



export async function searchUserbyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const searchUserName = req.body.searchValue;
    
    // Validate the request data
    const validatedRequestData = validateRequest(searchUserName, res);
    const cleanedSearchUserName = validatedRequestData.searchUserName;

    // Search for the user in the database
    const searchUser = await prisma.account.findMany({
      where: {
        userName: cleanedSearchUserName,
      },
      include: {
        picture: true,
      },
    });


    res.status(200).json(searchUser);
  } catch (error) {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json({
           success: false,
           message: error.message,
           code: error.code,
           functionName: "searchUserbyUser",

       });
       return
   }
    
    next(error);
  }
};


export default { searchUserbyUser }