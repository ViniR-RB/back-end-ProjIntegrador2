import 'reflect-metadata'
import Router from 'express'
import { parseISO } from 'date-fns'

import AppointmentRepository from './repository/Appointments_Repository'



import AppointmentServices from '../../services/AppointmentService'
import ensuredAuthenticated from '../../middlewares/ensuredAuthenticated'
import { JwtNotFound, JwtTokenInvalid } from '../../models/Erros'





const router = Router()
const appointmentsRepository = new AppointmentRepository()
const appointmentService = new AppointmentServices(appointmentsRepository)
router.use(ensuredAuthenticated)

router.get('/', async (req, res) => {
    try {
        const appointments = await appointmentService.getAllAppointments()
        res.status(200).send(appointments)
    } catch (err: any) {
        if(err instanceof JwtNotFound){
            res.send(err.message)
        }
        if(err instanceof JwtTokenInvalid){
            res.send(err.message)
        }
    }
});



router.post('/createAppointments', async (req, res) => {
    try {
        const { provider_id, date } = req.body



        const parseDate = parseISO(date)


        const appointment = await appointmentService.createAppointment({ provider_id, date: parseDate });

        res.json(appointment);
    } catch (err: any) {
        if (err instanceof Error) {
            res.send(err.message);
        }
    }
});




export default router
