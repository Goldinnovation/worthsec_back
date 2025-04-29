
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: any;
    decodedUserId: any;


}

const decodingBtoa = (req: Request, res: Response, next: NextFunction) => {


    const encryptedQueryId = req.query?.Id

    if (!encryptedQueryId || encryptedQueryId === undefined || encryptedQueryId === " " ) {
        res.status(400).json({ message: "Bad Query: userId is required" })
        return
    }
    const handleDecoding = (encryptedQueryId: any) => {
        if (typeof encryptedQueryId === "string") {
            const decodedId = atob(decodeURIComponent(encryptedQueryId))
            return decodedId

        } else {
            console.log('Invalid query parameter: Id must be a string');
            res.status(200).json({ message: "Invalid query parameter: id must be a string" });
            return
        }
    }
    
    const decodedId = handleDecoding(encryptedQueryId);
    (req as AuthenticatedRequest).decodedUserId = decodedId
    next();


}


export default decodingBtoa