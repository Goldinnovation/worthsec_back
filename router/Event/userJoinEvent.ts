import { Router } from 'express'
const router = Router();
import handleUserJoinEvent from '../../controller/Event/handleJoinEvents'



router.post('/', handleUserJoinEvent)


export default router

