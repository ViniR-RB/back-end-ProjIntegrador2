import Router from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from './repository/Appointments_Repository'
import CreateAppointmentService from '../../services/CreateAppointmentService'





const router = Router()


router.get('/', (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentRepository)
    const appointments =   appointmentsRepository.find()
    res.json(appointments);
});

router.post('/', (req, res) => {
    try {
        const { provider, date } = req.body
        const createAppointmentService = new CreateAppointmentService()


        const parseDate = parseISO(date)


        const appointment = createAppointmentService.execute({ provider, date: parseDate });



        return res.json(appointment);
    } catch (err: any ) {
      if(err instanceof Error){
        res.send(err.message);
      }
    }
});




export default router
