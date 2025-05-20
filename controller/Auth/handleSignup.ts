import bcrypt from 'bcrypt'
import prisma from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';
import createErrorWithContext from '../../utils/errorWithContext';
import CustomError from '../../errors/customError';







/** 
 * Purpose Statement--createUserAccount
 * The createUserAccount handler logic gets the user's information such as userName, email, and password. 
 * Before creating the record on the database table. The function verifies if the user already exist.
 * If the response is undefined, the funciton will create a record in the table.
 * 
*/

interface  userSignUpData {
    
    userName: string
    userEmail: string
    userPassword1: string
}



enum ErrorCodes {
    INVALID_USER_NAME = 'INVALID_USER_NAME',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_EMAIL_FORMAT = 'INVALID_EMAIL_FORMAT',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
    PASSWORD_TOO_WEAK = 'PASSWORD_TOO_WEAK' 
   
}

// Validate password strength
const validatePasswordStrength = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

// Validate sign up input data
const validateSignUpInput = (req: Request, res: Response, next: NextFunction): userSignUpData => {
  
    const {userName, userEmail, userPassword1} = req.body;

    if (!userName || typeof userName !== 'string' || userName === " " || userName === undefined) {
        throw new CustomError(
            'Username is required and must be a valid string',
            400,
            ErrorCodes.INVALID_USER_NAME,
            'validateSignUpInput'
        );
    }

    
    if (!userEmail || typeof userEmail !== 'string' || userEmail === " " || userEmail === undefined) {
        throw new CustomError(
            'Email address is required',
            400,
                ErrorCodes.INVALID_EMAIL,
                'validateSignUpInput'
        );
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        throw new CustomError(
            'Please enter a valid email address',
            400,
            ErrorCodes.INVALID_EMAIL_FORMAT,
            'validateSignUpInput'
        );
    }


    if (!userPassword1 || typeof userPassword1 !== 'string' || userPassword1 === " " || userPassword1 === undefined) {
        throw new CustomError(
            'Password is required',
            400,
            ErrorCodes.INVALID_PASSWORD,
            'validateSignUpInput'
        );
    }


    if (userPassword1.length < 8) {
        throw new CustomError(
            'Password must be at least 8 characters long',
            400,
            ErrorCodes.PASSWORD_TOO_SHORT,
            'validateSignUpInput'
        );
    }

    
      if (!validatePasswordStrength(userPassword1)) {
        throw new CustomError(
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            400,
            ErrorCodes.PASSWORD_TOO_WEAK,
            'validateSignUpInput'
        );
    }



 

    return { userName: userName.replace(/[<>]/g, '').trim(), userEmail: userEmail.replace(/[<>]/g, '').trim(), userPassword1: userPassword1.replace(/[<>]/g, '').trim() }
      

    
}
 
// ------------------------------------------------------------
// Check if user already exists - side function
const checkUserExists = async (userName: string): Promise<boolean> => {
    const userExist = await prisma.account.findFirst({
        where: { userName: userName }
    });

    return userExist !== null
};


// Create a new account - side function
const createNewAccount = async (userData: {userName: string; userEmail: string; userPassword1: string; }): Promise<void> => {
    
    const hashpw = await bcrypt.hash(userData.userPassword1, 10);
    await prisma.account.create({
        data: {
            userName: userData.userName,
            userEmail: userData.userEmail,
            userPassword1: hashpw
        }
    });
};

// ------------------------------------------------------------
   
// Handle sign up - main function
const handleSignUp = async (req: Request<{}, {}, userSignUpData>, res: Response, next: NextFunction) => {
    try {

        const validation = validateSignUpInput(req, res, next);

        const cleanedUserName = validation.userName;
        const cleanedUserEmail = validation.userEmail;
        const cleanedUserPassword1 = validation.userPassword1;
        
        
     

        const userExist = await checkUserExists(cleanedUserName)
        
        if (userExist === false) {
            res.status(400).json({ message: 'User already registered' })
            return
        }

        await createNewAccount({ userName: cleanedUserName, userEmail: cleanedUserEmail, userPassword1: cleanedUserPassword1 });

        res.json({ message: "New user created successfully"});


    } catch (error) {
        if (error instanceof CustomError) {
             res.status(error.statusCode).json({
                success: false,
                message: error.message,
                code: error.code,
                functionName: error.functionName,

            });
            return
        }
        next(error);

    }
}


export default handleSignUp