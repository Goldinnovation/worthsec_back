import { Router } from "express";
const router = Router()
import userGetCategoryEvent from '../../controller/Event/handleEventCategoryReq';
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken';




router.post('/', DecodeANDVerifyToken, userGetCategoryEvent )


export default router

