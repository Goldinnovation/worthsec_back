import { Router } from "express"
const router = Router()
import handleSignup from '../../controller/Auth/handleSignup'



router.get('/')
router.post('/', handleSignup)


export default router