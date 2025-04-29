import { Response, Request, NextFunction } from "express"


/** 
 * Purpose Statement--logout
    By pressing the logout button, the API endpoint logout will be triggert and execute the logout handler logic. 
    This function check first if the user which makes the request ist Authenticatedm, if this true it will execute the logout function from passport. 
    This execution will elimanat the current user authentican. Throughtout this process the user will be redirected to the login page-
/**
 * Function Signature--logout
 * @param {object} req - represents the current users request. 
 */




const logout = (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.isAuthenticated()) {
            res.json({ message: 'falied to logout' })
            return
        }

        req.logout(function (err) {
            if (err) {
                return next(err)
            } else {
                res.status(200).json({ message: 'user is logged out' })
                return
            }
        })

    } catch (error) {
        console.log("Server Error on logout handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default logout