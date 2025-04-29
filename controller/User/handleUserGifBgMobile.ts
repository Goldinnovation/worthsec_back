

import prisma from '../../libs/prisma';
import { Request, Response } from "express";
import { NextFunction } from "express";
import giveCurrentDateTime from '../../utils/date';
import {getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import config from '../../config/firebase'
import sharp from 'sharp'

interface AuthenticatedRequest extends Request{
    user?: any;
    decodedUserId: any
    file?: Express.Multer.File;
  }
  
  
  


export async function uploadGifBgMobile(req: Request, res: Response): Promise<void>{

    try{

      const userId = (req as AuthenticatedRequest)?.decodedUserId
      const gifUrl =  req.body.data

      if (!userId || userId === undefined || userId === " ") {
        res.status(400).json({ message: 'Invalid Request, userId is required' });
        return
      }

      if (!gifUrl || gifUrl === undefined || gifUrl === " ") {
        res.status(400).json({ message: 'Invalid Request, gifUrl is required' });
        return
      }

      const checkGifExist = await prisma.picture.findFirst({
        where:{
            picture_owner_id: userId,
        }
      })

         if(checkGifExist){
             await uploadGigUrlToDB(checkGifExist,userId, gifUrl, res)
         }


   




    }catch(error){
      console.error('Erron on function:uploadProfilePicture', error);
      res.status(500).json({ message: "Internal Server Error" });

    }
}


export const uploadGigUrlToDB = async(checkGifExist: any, userId: string, gifUrl: string, res: Response) => {

    try{
        if (checkGifExist) {

            const uploadedgif = await prisma.picture.update({
              where: { picture_owner_id:  userId},
              data: {
                gifUrl: gifUrl ,
              },
            });
            console.log('uploadedgif', uploadedgif);
            console.log("gif picture uploaded as updated");
          
            res.status(200).json({ message: "Gif Background is successfully stored" });
        }
      
      
    
    }catch(error){
        console.error('Erron on function: uploadGigUrlToDB', error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}



export default uploadGifBgMobile

