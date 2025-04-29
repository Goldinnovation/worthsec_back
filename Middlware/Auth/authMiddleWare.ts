import { Response, Request, NextFunction } from "express";
import session from "express-session";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}


// Checks if the user is logged through a token or a Session Id
// If the user is logged through a session Id, than the Authentication Information will be provided by the Request Authenticator from Express. 
// Otherwise the user will receive the toke and verify it's existence and decode it. Furthermore, the decoded Information will be assigned to the Express Request Authenticator 
const authMiddlewareCheck = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const tokenKey = process.env.JWT_SECRET_KEY as string;

  try {
    if (req.user) {
      next();
    } else if (token) {
      jwt.verify(token, tokenKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token " });
        } else {
          console.log('decoded', decoded);
          req.user = decoded;
          next();
        }
      });
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log("Error on Authentication middleware", error);
  }
};

export default authMiddlewareCheck;
