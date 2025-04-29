import { Router } from "express"
const router = Router()
import handlelogout from '../../controller/Auth/handleLogout'






router.get('/', handlelogout)
router.post('/')


export default router