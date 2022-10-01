import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../modules/appointment/repository/Appointments_Repository'
import Appointment from "../models/Appointment";



interface Request {
    provider: string
    date: Date
}

export default class CreateAppointmentService {


    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentRepository)


        const appointmentDate = startOfHour(date)



        const findAppointmentSameDate = await appointmentsRepository.findAppointmente(appointmentDate);


        if(findAppointmentSameDate){
            throw new Error('This appointment is already broked')
        }

        const appointment = appointmentsRepository.create({
            provider,date: appointmentDate
        });

        await appointmentsRepository.save(appointment)




        return appointment


    }
}
