import { Response, Request, NextFunction } from "express"


interface AuthenticatedRequest extends Request{
    user?: any
}






const handlecheckAuth = (req: Request, res: Response, next: NextFunction): void =>{
    const username = req.params.id;
    console.log('username', username);
    const loggedUser =  (req as AuthenticatedRequest).user?.name as string 
    console.log('loggedUser', loggedUser );
    try {
     
        if(loggedUser !== username){
           res.status(200).json({message: "Invalid User Request", activeUser:loggedUser })
           return
        }
        res.status(200).json({message: "User Authenticated"})
    } catch (error) {
        console.log("Server Error on logout handler function HandlecheckAuth, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default handlecheckAuth