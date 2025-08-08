import { RequestHandler, Router } from "express"
const router = Router()
import { userFavorsEvent, getUserFavoredEvents } from '../../controller/Event/handleFavorEvent'
// import tokenDecodeAuth from "@/server/Middlware/User/tokenAuthDecoder";
import tokenDecodeAuth from '../../Middlware/User/tokenAuthDecoder';
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare';
import DecodeANDVerifyToken from "../../Middlware/User/categoryConverToken";


router.get('/', authMiddlewareCheck, getUserFavoredEvents )

router.post('/', DecodeANDVerifyToken, userFavorsEvent)


export default router

