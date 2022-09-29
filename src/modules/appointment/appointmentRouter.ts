import Router from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from './repository/Appointments_Repository'
import CreateAppointmentService from '../../services/CreateAppointmentService'





const appointmentsRepository = new AppointmentRepository()
const router = Router()


router.get('/', (req, res) => {
    const appointments = appointmentsRepository.getAppointments();
    res.json(appointments);
});

router.post('/', (req, res) => {
    try {
        const { provider, date } = req.body
        const createAppointmentService = new CreateAppointmentService(appointmentsRepository)


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
