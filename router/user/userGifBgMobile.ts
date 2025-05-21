import { Router } from "express"
const router = Router()
import uploadGifBgMobile from '../../controller/User/handleUserGifBgMobile'
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken'
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare'


router.post('/', authMiddlewareCheck,  uploadGifBgMobile )


export default router

