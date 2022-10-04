import { Repository } from 'typeorm'
import 'reflect-metadata'

import Appointment from "../../../models/Appointment";
import AppDataSource from '../../../databases';

class AppointmentRepository {


    public async findAppointmentSameDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await AppDataSource.getRepository(Appointment).findOne({
            where: { date },
        });





        return findAppointment || null;
    }
    public async findAppointment(): Promise<Appointment[]> {
        const appointmentsRepository = AppDataSource.getRepository(Appointment)
        const appointments = await appointmentsRepository.find()

        return appointments
    }




}

export default AppointmentRepository
