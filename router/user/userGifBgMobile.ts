import { Router } from "express"
const router = Router()
import uploadGifBgMobile from '../../controller/User/handleUserGifBgMobile'
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken'
router.post('/', DecodeANDVerifyToken,  uploadGifBgMobile )


export default router

