import { Response, Request, NextFunction } from 'express';

interface AuthenticatedRequest extends Request{
    user?: any
}


const isAuthenticated = (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
    try{
        if(req.user) {
          
            next(); 
    
        }else{
            
            return res.redirect('/')
        }

    }catch(error){
        console.log('Error on Authentication middleware', error);
    }
 
} 


export default isAuthenticated