import { DataSource } from "typeorm";
import Appointment from "../models/Appointment";
import { CreateAppointment1664641790675 } from "./migrations/1664641790675-CreateAppointment";


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin2309",
    database: "bootcamp",
    entities: [Appointment],
    migrations: [
        "./src/databases/migrations/*.ts"
    ],







});
AppDataSource.initialize().then(() => console.log('database run')).catch((e) => console.log('error', e))
export default AppDataSource



