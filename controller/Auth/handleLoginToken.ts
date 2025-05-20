import prisma from '../../libs/prisma';
import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import { Express } from 'express';
import { generateToken } from '../../config/passport';
import createErrorWithContext from '../../utils/errorWithContext';

interface User {
  userId: string, 
  userName: string, 
  userEmail: string, 
  userPassword1: string

}


// interface AuthenticatedRequest extends Request{
//   user?: User

// }
/** 
 * Purpose Statement--userlog
 *By clicking the login button the user triggers the API endpoint userlog.
 *The endpoint executes the passport authenticatiion, which verfies if the user information exist the  in the account database table 
 *if the user exist in the account database table the passport authenticator creates a session Id for the user and stores it 
 *in the session database table and cookie. Throughthe session id the user will be redirect to the main page
*/



const authenticate = (req: Request, res: Response, next: NextFunction) => 
  new Promise<User | false>((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err: Error, user:User | false, info: {message: string} | undefined) => {
      if (err) {
        reject(err);
      } else if (!user) {
        return res.status(401).json({success:false, message: info?.message || "login failed"})
      } else {
        resolve(user);
      }
    })(req, res, next);
  });



  const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
 try {
  const {loginEmail, loginPassword} = req.body

      // Check if required fields exist
      // if (!loginEmail || !loginPassword) {
      //     res.status(400).json({
      //     success: false,
      //     message: "Email and password are required"
      //   });
      //   return
      // }
  
      // Validate email format
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(loginEmail)) {
      //     res.status(400).json({
      //     success: false,
      //     message: "Invalid email format"
      //   });
      //   return
      // }
  
      // Validate password length
      // if (loginPassword.length < 6) {
      //     res.status(400).json({
      //     success: false,
      //     message: "Password must be at least 6 characters long"
      //   });
      //   return
      // }

      return true
 } catch (error) {
  next(error)
 }

    
  }


const checkUserInterest = async (userId: string) => {
  const userInterest = await prisma.userInterest.findUnique({
    where: {
      user_interest_id: userId
    },
  })
  if(userInterest === null || userInterest === undefined) {
    return null
  } else {
    return userInterest
  }
}

const userLoginWithToken = async (req: Request, res: Response, next: NextFunction) => {

  try {

    // Validate login input
    validateLoginInput(req, res, next)
    const user = await authenticate(req, res, next);
    const token = generateToken(user as any);

    if (user === false) {
      res.status(400).json({ message: "User not found" });
      return
    }

    if (!token) {
      res.status(400).json({ message: "Token data is invalid" });
      return
    }


    const userId = user?.userId
    const userName = user?.userName
    const userInterestMessage = await checkUserInterest(userId)


    if (userInterestMessage === null || userInterestMessage === undefined) {

      res.status(200).json({ token, message: "Interest section is empty",  message2: "Login Successful", userNameData:userName})

    } else {

      res.status(200).json({ token, message: "Interest data exist", message2: "Login Successful", userNameData:userName });
    }


  } catch (error) {
    if (error instanceof Error) {
      next(createErrorWithContext(error, 'userLoginWithToken'));
    } else {
      const newError = new Error(String(error));
      next(createErrorWithContext(newError, 'userLoginWithToken'));
    }
  }
}

export default {userLoginWithToken}