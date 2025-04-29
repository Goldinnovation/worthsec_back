import { Router } from "express"
const router = Router()
import {searchUserbyUser} from '../../controller/User/handleSearchUser'



router.get('/')
router.post('/', searchUserbyUser)


export default router