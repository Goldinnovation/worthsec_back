import prisma from '../../libs/prisma';
import { Response, Request, NextFunction } from 'express';



interface AuthenticatedRequest extends Request {
  user?: any;
  decodedUserId: any;
  category: any
}





async function userGetCategoryEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    const userId = (req as AuthenticatedRequest)?.decodedUserId
    const selectedCategory = req.body.cateogory


    if (userId === undefined) {
      res.status(400).json({ message: 'Invalid Request, userId does not exist' });
      return
    }

    if (selectedCategory === " " || selectedCategory === undefined) {
      res.status(400).json({ message: 'Invalid Request: selectedCategory does not match the requirements' });
      return
    }



    const UserselectedData = await prisma.event.findMany({
      where: {
        eventType: selectedCategory
      }
    })

    res.status(200).json(UserselectedData)



  } catch (error) {

    console.log("Server Error on userGetCategoryEvent handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }

}


export default userGetCategoryEvent;
