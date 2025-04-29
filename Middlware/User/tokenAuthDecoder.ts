import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
  decodedUserId: any;
 

  
}
interface DJwtPayload extends JwtPayload {
  userId: string;
  email: string; //before was Email
}


const tokenDecodeAuth = (
  req: Request,
  res: Response,
  next: NextFunction
)  =>  {

  const authHeader = req.headers.authorization

  if(!authHeader){
    res.status(400).json({message: "Invalid Request"})
    return 
  }

    const token = authHeader.split(' ')[1]
    const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const decoded = jwt.verify(token, SECRET_KEY) as DJwtPayload;
    
    
    (req as AuthenticatedRequest).decodedUserId = decoded.userId;
    

    next();
  
};

export default tokenDecodeAuth;
