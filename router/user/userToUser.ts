import { Router } from "express"
const router = Router()
import {searchUser_friends,followUser, unFollowUser} from '../../controller/User/handleUserToUser'




router.get('/:id', searchUser_friends)
router.post('/', followUser)
router.delete('/', unFollowUser)


export default router