import { Router } from "express";
const router = Router()
import { updatetoNewEventData } from '../../controller/Event/handleUpdateToNewExploreData';
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare';
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken';


router.post('/', authMiddlewareCheck, updatetoNewEventData)


export default router

