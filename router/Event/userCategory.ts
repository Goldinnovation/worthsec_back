import { Router } from "express";
const router = Router()
import userGetCategoryEvent from '../../controller/Event/handleEventCategoryReq';
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken';
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare';



router.post('/', authMiddlewareCheck, userGetCategoryEvent )


export default router

