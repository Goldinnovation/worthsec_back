import { Router } from "express"
const router = Router()
import handleLog from '../../controller/Auth/handleLogin'






router.get('/')
router.post('/', handleLog)


export default router