import { Router } from "express"
const router = Router()
import hanldeUserQRCodeReqData from '../../controller/User/handleUserQrRequest'
import decodingBtoa from '../../Middlware/User/decodingbtoa'



router.get('/', decodingBtoa,hanldeUserQRCodeReqData)


export default router