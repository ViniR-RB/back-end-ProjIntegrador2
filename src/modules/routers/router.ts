import Router from 'express'
import apoimentsRouter from '../appointment/appointmentRouter'
import userRouter from '../user/UserRouter'
import authRouter from '../auth/authRouter'

const router = Router()

router.use('/appointment', apoimentsRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter )

export default router
