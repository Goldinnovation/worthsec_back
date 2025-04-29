import { Router } from "express"
const router = Router()
import { userFavorsEvent, getUserFavoredEvents } from '../../controller/Event/handleFavorEvent'
// import tokenDecodeAuth from "@/server/Middlware/User/tokenAuthDecoder";
import tokenDecodeAuth from '../../Middlware/User/tokenAuthDecoder';



router.get('/', tokenDecodeAuth, getUserFavoredEvents)

router.post('/', userFavorsEvent)


export default router

