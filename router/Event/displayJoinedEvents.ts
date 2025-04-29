import {Router} from "express"
const router = Router()
import {getUserJoinedEvents} from '../../controller/Event/handledisplayJoinedEvents'



router.get('/', getUserJoinedEvents)

export default router
