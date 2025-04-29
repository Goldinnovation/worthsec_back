import prisma from '../../libs/prisma';
import { Request, Response } from "express";

/**
 * Purpose Statement--searchUserbyUser
 *  The searchUserbyUser handler allows the current user to retrieve the other users data.
 *  By typing the other users name on the client side, the handler logic will use the request to retrieve the searched picture object from the database
 *
 */

/**
 * Function Signature--searchUserbyUser
 *
 * @param {string} searchUserName - Types value from the client side.
 * @returns {object} Returns an object of the other user from the database account table.
 */



export async function searchUserbyUser(req: Request, res: Response): Promise<void> {
  try {
    const searchUserName = req.body.searchValue;

    if (!searchUserName) {
      res.status(400).json({ message: 'Invalid Request: searchUserName is invalid' });
    }

    const searchUser = await prisma.account.findMany({
      where: {
        userName: searchUserName,
      },
      include: {
        picture: true,
      },
    });


    res.status(200).json(searchUser);
  } catch (error) {
    console.log("Server Error on searchUserbyUser handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export default { searchUserbyUser }