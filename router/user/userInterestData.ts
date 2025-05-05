import { Router } from 'express'
const router = Router();
import handlerUserInterestData from '../../controller/User/handleuserInterestData'
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken';
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare';

router.post('/', authMiddlewareCheck , handlerUserInterestData )


export default router























