import { startOfHour } from 'date-fns'
import AppointmentRepository from '../modules/appointment/repository/Appointments_Repository'
import Appointment from "../models/Appointment";
import AppDataSource from '../databases';




interface Request {
    provider_id: string
    date: Date
}

export default class AppointmentServices {
    private repository

    constructor(repository: AppointmentRepository) {
        this.repository = repository;
    }

    public async createAppointment({ provider_id, date }: Request): Promise<Appointment> {

        const appointmentDate = startOfHour(date)

        const findAppointmentSameDate = await this.repository.findAppointmentSameDate(appointmentDate)



        if (findAppointmentSameDate) {
            throw new Error('This appointment is already broked')
        }

        const appointment = AppDataSource.getRepository(Appointment).create({
            provider_id: provider_id, date: appointmentDate
        });

        await Appointment.save(appointment)




        return appointment
    }
    public async getAllAppointments() {
        const appointments = await this.repository.findAppointment()

        return appointments;
    }

}
