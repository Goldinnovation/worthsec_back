import { Router } from 'express'
const router = Router();
import handlerUserInterestData from '../../controller/User/handleuserInterestData'
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken';


router.post('/', DecodeANDVerifyToken , handlerUserInterestData )


export default router























