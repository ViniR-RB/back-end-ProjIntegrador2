import Router from 'express'
import apoimentsRouter from '../appointment/appointmentRouter'

const router = Router()

router.use('/appointment', apoimentsRouter);



export default router
