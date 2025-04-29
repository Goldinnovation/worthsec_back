import prisma from '../../libs/prisma';
import { Request, Response } from "express";
import { NextFunction } from "express";
import giveCurrentDateTime from '../../utils/date';
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import config from '../../config/firebase'
import sharp from 'sharp'
import { execFile } from 'node:child_process';
import tmp from "tmp"
import gifsicle from "gifsicle"
import * as fs from 'fs';

import { resolve } from "node:path";
import { rejects } from "node:assert";
import { error } from "node:console";






initializeApp(config.firebaseConfig);
const storage = getStorage();

interface AuthenticatedRequest extends Request {
  user?: any;
  file?: Express.Multer.File;
}


export async function processUserBackgroundGifImage(req: AuthenticatedRequest, res: Response): Promise<void> {

  try {
    if (!req.file) {
      res.status(400).json({ message: "File could not be found" });
      return
    }

    const file = req.file as Express.Multer.File;
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `userBackground/${dateTime}_${file.originalname}`
    );

    const compromiseGifData = await compromiseGif(file.buffer, res);
    const metadata = { contentType: "image/gif" };

    uploadFileToFirebase(storageRef, compromiseGifData, metadata, req, res)


  } catch (error) {
    console.log("Server Error on processUserBackgroundGifImage handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }




};

export const compromiseGif = async (buffer: any, res:Response): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {

      const tmpInputFile = tmp.fileSync({ postfix: "gif" });
      const tmpOutputFile = tmp.fileSync({ postfix: "gif" });
      fs.writeFileSync(tmpInputFile.name, buffer);

      execFile(
        gifsicle,
        [
          "--resize",
          "400x300",
          "--optimize",
          "--delay", "20",
          "--output",
          tmpOutputFile.name,
          tmpInputFile.name,
        ],
        (error) => {
          error &&
            (() => {
              return reject(error);
            });

          const optimizedGifBuffer = fs.readFileSync(tmpOutputFile.name);
          resolve(optimizedGifBuffer);
        }
      );
    } catch (Error) {
      console.log("Server Error on compromiseGif handler function, CatchBlock - True:", error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};


const uploadFileToFirebase = async (storageRef: any, compromiseGifData: any, metadata: any, req: AuthenticatedRequest, res: Response) => {
  try {
    const uploadaction = uploadBytesResumable(
      storageRef,
      compromiseGifData,
      metadata
    );


    const snapshot = await uploadaction;
    const uploadedGifUrl = await getDownloadURL(snapshot.ref);

    handleUploadGifUrlToDB(uploadedGifUrl, req, res)

  } catch (error) {
    console.log("Server Error on uploadFileToFirebase handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }


}



const handleUploadGifUrlToDB = async (gifUrl: string, req: AuthenticatedRequest, res: Response) => {

  try {

    const currentUserId = req.user.userId

    
    if (!currentUserId || currentUserId === undefined || currentUserId === " ") {
      res.status(400).json({ message: 'Invalid Request, currentUserId is required' });
      return;
  }

   const updatedBackGround =  await prisma.picture.update({
      where: {
        picture_owner_id: currentUserId,

      },
      data: {
        gifUrl: gifUrl
      }
    })

    console.log('updatedBackGround', updatedBackGround);
    res.json({ message: "Successfully created the gif Image upload" })

  }
  catch (error) {
    console.log("Server Error on handleUploadGifUrl handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }



}


export default { processUserBackgroundGifImage }