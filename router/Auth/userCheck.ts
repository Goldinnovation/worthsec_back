import { Router } from "express"
const router = Router()
import handlecheckAuth from '../../controller/Auth/handleCheckAuth'
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare'



router.get('/:id', authMiddlewareCheck, handlecheckAuth)
router.post('/')


export default router