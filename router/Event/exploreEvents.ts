import { Router } from "express";
const router = Router()
import {exploreEvents} from '../../controller/Event/handleExploreEvents'
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare';




router.get('/', authMiddlewareCheck, exploreEvents)


export default router

