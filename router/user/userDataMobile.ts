import { Router } from "express";
const router = Router()
import handleUserData from '../../controller/User/handleUserData';
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare';


router.get('/', authMiddlewareCheck, handleUserData.handleUserDataInfoReq )


export default router