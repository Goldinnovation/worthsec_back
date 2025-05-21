import passport from 'passport';
import { Response, Request, NextFunction } from 'express';

interface AuthenticatedRequest extends Request{
    user?: Express.User
}



const checkAuth = (req:AuthenticatedRequest, res:Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error, user: Express.User | false, info: {message: string} | string) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication Error' });
    }
    if (!user) {
      return res.status(401).json('user not found');
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Session error' });
      }
     
      return next(); 
    });
  })(req, res, next);
};




export default checkAuth