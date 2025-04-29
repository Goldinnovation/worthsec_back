
// const {getStorage, ref, deleteObject, getDownloadURL, UuploadBytesResumable, uploadBytesResumable}=require("firebase/storage")

import {getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import config from '../../config/firebase'
import { Sharp } from 'sharp'
import sharp from 'sharp'
import prisma from '../../libs/prisma';
import giveCurrentDateTime from '../../utils/date'
import { Request, Response } from 'express';
import multer from 'multer';
import { Express } from 'express';





initializeApp(config.firebaseConfig);
const storage = getStorage();


/**
 * Purpose Statement--createEvent
 *  The user can create an event, by entering the requested information such as like name,date,time,Image, description and type of event. 
 *  After the accomplishment of the process the data will be stored in the event database table.
 *  Unless the Image file, this will be stored on a external database. I choose for the project Worthsec firebase cloud storage. 
 *  After storing the image file on the cloud, firebase will generate a url as respond. This url will be stored in the event database table. 
 *  Enabling the presentation of the Image on the client side 
 * 


/**
 * Function Signature--userFavorEvent
 * 
 * @param {string} userId - The value represents the ID of the current user that favored the Event.
 * @param {string} req.body.eventTitle - The value represents the ID of the Event that was favored by the user.
 * @param {int} IntEventType
 * @param {string} req.body.eventDate
 * @param {string} req.body.eventDescriptionContent
 * @param {string} req.body.eventTime
 * @param {string}  downloadImageUrl
 * @param {int} eventinviteNum
 * @returns {string} Returns an object of the created event. 
 */



interface AuthenticatedRequest extends Request{
    user?: any,
    file?: Express.Multer.File
}


interface EventCreateInput {
    ImageCoverUpload: string;  
  }






const createEvent = async (req: AuthenticatedRequest, res: Response) => {

    try {
        // Handles Image data, convert to url
      const cloudImageUrl = await FirebaseService(req, res);

      const userId = req.user.userId;
      const eventHostName = req.user.userName;
      const eventTitle = req.body.eventTitle;
      const eventDate = req.body.eventDate;
      const eventType = req.body.eventType;
      const zipcode = req.body.eventZipcode;
      const eventAddress = req.body.eventAddress;
      const eventCity = req.body.cityType;
      const eventDescription = req.body.eventDescriptionContent;
      const eventTime = req.body.eventTime;

      let selectedStrRange = req.body.selectedRangeofEvents;
      const selectedIntRange = parseInt(selectedStrRange, 10);

      let eventinviteNum;
      req.body.Only_friends === "1"
        ? (eventinviteNum = parseInt(req.body.Only_friends, 10))
        : req.body.friends_Plus_Plus === "2"
        ? (eventinviteNum = parseInt(req.body.friends_Plus_Plus, 10))
        : req.body.worldwideClass === "3"
        ? (eventinviteNum = parseInt(req.body.worldwideClass, 10))
        : (eventinviteNum = 3);

    
        if (!userId || userId === "undefined" || userId === " ") {
            res.status(400).json({ message: "Bad Request: userId data is invalid" });
        }
        if (!eventHostName) {
            res.status(400).json({ message: "Bad Request: eventHostName data is invalid" });
        }
        if (!eventTitle) {
            res.status(400).json({ message: "Bad Request: eventTitle data is invalid" });
        }
        if (!eventDate) {
            res.status(400).json({ message: "Bad Request: eventDate data is invalid" });
        }
        if (!eventType) {
            res.status(400).json({ message: "Bad Request: eventType data is invalid" });
        }
        if (!zipcode) {
            res.status(400).json({ message: "Bad Request: zipcode data is invalid" });
        }
        if (!eventAddress) {
            res.status(400).json({ message: "Bad Request: eventAddress data is invalid" });
        }
        if (!eventCity) {
            res.status(400).json({ message: "Bad Request: eventCity data is invalid" });
        }
        if (!eventDescription) {
            res.status(400).json({ message: "Bad Request: eventDescription data is invalid" });
        }
        if (!eventTime) {
            res.status(400).json({ message: "Bad Request: eventTime data is invalid" });
        }



      const ImageUrl = cloudImageUrl ?? "Default Url Image";
      await prisma.event.create({
        data: {
          eventHost: userId,
          eventHostName: eventHostName,
          eventTitle: eventTitle,
          eventType: eventType,
          eventDate: eventDate,
          eventDescriptionContent: eventDescription,
          eventTime: eventTime,
          ImageCoverUpload: ImageUrl,
          eventInviteType: eventinviteNum,
          eventAddress: eventAddress,
          eventZipcode: zipcode,
          cityType: eventCity,
          selectedRangeofEvents: selectedIntRange,
        },
      });

      res.status(200).json({ message: "file successful uploaded" });
    } catch (error) {
        console.log("Unexpected Server Error on createEvent function, CatchBlock - True:", error)
      res
        .status(500)
        .json({ message: "Internal Server Error" });
    }
}



export const FirebaseService = async(req: AuthenticatedRequest, res: Response) => {

    try {
      const file = req.file as Express.Multer.File;

      if (!req.file) {
        res.status(400).json({ message: "File could not be found" });
      }

      const dateTime = giveCurrentDateTime();
      const storageRef = ref(storage, `files/${dateTime}_${file.originalname}`);


      const compromiseImage = await sharp(file.buffer)
        .resize({ width: 800, height: 1050 })
        .jpeg({ quality: 80 })
        .toBuffer();

     const compromiseImageUint8Array = new Uint8Array(compromiseImage);

     console.log('compromiseImageUint8Array', compromiseImageUint8Array);

      const metadata = {
        contentType: file.mimetype,
      };

      const uploadaction = uploadBytesResumable(
        storageRef,
        compromiseImageUint8Array,
        metadata
      );

      const snapshot = await uploadaction;
      const ImageUrl = await getDownloadURL(snapshot.ref);

      return ImageUrl;
    } catch (error) {
        console.log("Unexpected Server Error on FirebaseService function, CatchBlock - True:", error)
        res
        .status(500)
        .json({ message: "External Server Error" });
    }
}




































const findEvents = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.user.userId
        if (!userId) {
            res.status(400).json({ message: "Bad Request: userId is required" });
        }


        const userEvents = await prisma.event.findMany({
            where: {
                eventHost: req.user.userId
            },

        });

        res.json(userEvents);


    } catch (error) {
        console.error(error)
        res.status(500).send('Error with find Event logic  ')
    }

}








// Delete an Event Object 

 const deleteEvent = async(req: AuthenticatedRequest,res: Response) => {
  
    try{
        const eventID = req.params.id;
        const imagePath = req.body.eventpath
       
        if(!eventID){
            console.log('inside error');
            res.status(400).json({ message: "Bad Request: eventId is invalid" });

        }
           
        const userDeletedEvent = await prisma.event.delete({
                    where: {
                        eventId: eventID
                    }
                })
                
        
        
        if(userDeletedEvent){
            const storageRef = ref(storage, imagePath)
            await deleteObject(storageRef)
            res.status(200).json({message: "Event is successfull deleted from the db "})
        }
               
        
    }catch(error){
        res.status(500).json({message:"Error trying to Delete the object"})
    }


}


export default {deleteEvent, findEvents, createEvent }