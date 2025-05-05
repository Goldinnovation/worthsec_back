import { Router } from "express"
const router = Router()
import { userFavorsEvent, getUserFavoredEvents } from '../../controller/Event/handleFavorEvent'
// import tokenDecodeAuth from "@/server/Middlware/User/tokenAuthDecoder";
import tokenDecodeAuth from '../../Middlware/User/tokenAuthDecoder';
import authMiddlewareCheck from "../../Middlware/Auth/authMiddleWare";


router.get('/', authMiddlewareCheck, getUserFavoredEvents)

router.post('/',authMiddlewareCheck, userFavorsEvent)


export default router

