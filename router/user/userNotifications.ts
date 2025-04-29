import { Router } from "express"
const router = Router()
import {getCurrentUserNotification} from '../../controller/User/handleUserNotifications'


router.get('/', getCurrentUserNotification)


export default router