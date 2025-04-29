import { Router } from "express"
const router = Router()
import handleEvent from '../../controller/Event/handleEvent'
import ImageFileUpload from '../../Middlware/coverImage'
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare'


router.get('/', authMiddlewareCheck, handleEvent.findEvents)
router.post('/', ImageFileUpload, handleEvent.createEvent )
router.delete('/:id', handleEvent.deleteEvent )


export default router

