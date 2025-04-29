import bcrypt from 'bcrypt'
import prisma from '../../libs/prisma';
import { Request, Response } from 'express';








/** 
 * Purpose Statement--createUserAccount
 * The createUserAccount handler logic gets the user's information such as userName, email, and password. 
 * Before creating the record on the database table. The function verifies if the user already exist.
 * If the response is undefined, the funciton will create a record in the table.
 * 
*/


interface  User {
    
    userName: string
    userEmail: string
    userPassword1: string
}





const checksIfUserExist = async (req: Request<{}, {}, User>, res: Response) => {
    try {
        const userName = req.body.userName

        const userExist = await prisma.account.findFirst({
            where:
            {

                userName: userName
            }
        })

        console.log('userEist', userExist);
        createsNewAcc(userExist, req, res)


    } catch (error) {
        console.log("Server Error on checksIfUserExist handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}



const createsNewAcc = async (userExist: any, req: Request, res: Response) => {
    try {
        const userName = req.body.userName
        const userEmail = req.body.userEmail
        const hashpw = await bcrypt.hash(req.body.userPassword1, 10)

        if (userExist) {
            res.status(400).json({ message: 'User already Exist' })
            return
        }

        await prisma.account.create({
            data:
            {
                userName: userName,
                userEmail: userEmail,
                userPassword1: hashpw
            }

        })

        res.json({ message: "new user created" })

    } catch (error) {
        console.log("Server Error on createsNewAcc handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default checksIfUserExist