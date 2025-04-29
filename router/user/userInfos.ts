import { Router } from "express";
import {getUserProfilePicture, getUserProfileImgData as createProfilePicture, deleteUserProfilePicture} from '../../controller/User/handleUserInfo'
const router = Router()
import processUserPictureFile from '../../Middlware/User/processUserPicture'




router.get('/', getUserProfilePicture)
router.post('/', processUserPictureFile, createProfilePicture)
router.delete('/:id', deleteUserProfilePicture)


export default router