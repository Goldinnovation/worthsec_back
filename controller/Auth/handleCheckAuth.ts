import { Response, Request, NextFunction } from "express"
import CustomError from "../../errors/customError";


interface AuthenticatedRequest extends Request{
    user?: any
}





const validateRequest = (username: string, loggedUser: string, res: Response) => {
    if(loggedUser !== username){
        res.status(200).json({message: "Invalid User Request", activeUser:loggedUser })
        return
     }

     return {
        username: username.replace(/[<>]/g, '').trim(),
        loggedUser: loggedUser.replace(/[<>]/g, '').trim()
     }
}

const handlecheckAuth = (req: Request, res: Response, next: NextFunction): void =>{
   
    try {
        const username = req.params.id;
        const loggedUser =  (req as AuthenticatedRequest).user?.name as string 

        const validatedRequestData = validateRequest(username, loggedUser, res)

        const cleanedUsername = validatedRequestData?.username
        const cleanedLoggedUser = validatedRequestData?.loggedUser
     
        if( cleanedLoggedUser !== cleanedUsername){
            res.status(200).json({message: "User Authenticated"})
        }
      
    } catch (error) {
       if (error instanceof CustomError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            code: error.code,
            functionName: handlecheckAuth,
       });
       return
       }
       next(error)
    }
}

export default handlecheckAuth