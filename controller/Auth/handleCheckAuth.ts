import { Response, Request, NextFunction } from "express"
import CustomError from "../../errors/customError";


interface AuthenticatedRequest extends Request{
    user?: any
}






const handlecheckAuth = (req: Request, res: Response, next: NextFunction): void =>{
    const username = req.params.id;
    const loggedUser =  (req as AuthenticatedRequest).user?.name as string 
    try {
     
        if(loggedUser !== username){
           res.status(200).json({message: "Invalid User Request", activeUser:loggedUser })
           return
        }
        res.status(200).json({message: "User Authenticated"})
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
       next(error)
    }
}

export default handlecheckAuth