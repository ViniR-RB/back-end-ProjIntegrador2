import { DataSource } from "typeorm";
import Appointment from "../models/Appointment";
import User from "../models/User";



const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin2309",
    database: "bootcamp",
    entities: [
        Appointment, User
    ],
    migrations: [
        "./src/databases/migrations/*.ts"
    ],

});

export default AppDataSource





