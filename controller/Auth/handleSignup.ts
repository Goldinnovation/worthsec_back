import bcrypt from 'bcrypt'
import prisma from '../../libs/prisma';
import { Request, Response, NextFunction } from 'express';
import createErrorWithContext from '../../utils/errorWithContext';







/** 
 * Purpose Statement--createUserAccount
 * The createUserAccount handler logic gets the user's information such as userName, email, and password. 
 * Before creating the record on the database table. The function verifies if the user already exist.
 * If the response is undefined, the funciton will create a record in the table.
 * 
*/


interface  User {
    
    userName: string
    userEmail: string
    userPassword1: string
}




// const validateSignUpInput =  (req: Request): { isValid: boolean; error?: string } => {
  
//     const {userName, userEmail, userPassword1} = req.body;

//     // Check if required fields exist
//     if (!userName || !userEmail || !userPassword1) {
//         return { 
//             isValid: false, 
//             error: "Email and password are required" 
//         };
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(userEmail)) {
//         return { 
//             isValid: false, 
//             error: "Invalid email format" 
//         };
//     }

//     // Validate password length
//     if (userPassword1.length < 8) {
//         return { 
//             isValid: false, 
//             error: "Password must be at least 6 characters long" 
//         };
//     }

//     return { isValid: true };

    
// }
 
const checkUserExists = async (userName: string): Promise<boolean> => {
    const userExist = await prisma.account.findFirst({
        where: { userName: userName }
    });

    console.log('userExist', userExist);
    return userExist == null ? true : false;
};

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

   

const handleSignUp = async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    try {

        const {userName, userEmail, userPassword1} = req.body;
        console.log('userName', userName);

        // validateLoginInput(req, res, next)
        // const validation = validateSignUpInput(req);
        // if (!validation.isValid) {
        //     return res.status(400).json({
        //         success: false,
        //         message: validation.error
        //     });
        // }
        
     

        const userExist = await checkUserExists(userName)
        
        if (userExist === false) {
            res.status(400).json({ message: 'User already Exist' })
            return
        }

        await createNewAccount({ userName, userEmail, userPassword1 });

        return res.json({ 
            message: "New user created successfully" 
        });


    } catch (error) {
        if (error instanceof Error) {
            next(createErrorWithContext(error, 'checksIfUserExist'));
        } else {
            const newError = new Error(String(error));
            next(createErrorWithContext(newError, 'checksIfUserExist'));
        }

    }
}


export default handleSignUp