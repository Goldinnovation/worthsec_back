import { Router } from 'express'
const router = Router();
import handleUserImageProfileUpload from '../../controller/User/handleuserProfilePictureMobileUpload'
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken';

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 }}).single("image");


router.post('/', upload, DecodeANDVerifyToken , handleUserImageProfileUpload )


export default router