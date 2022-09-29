import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type : "postgres",
    host: "localhost",
    port : 5432,
    username: "vinicius",
    password: "docker",
    database: "bootcamp",
    migrations: [
        "./src/database/migrations/*.ts"
    ],
    




});
AppDataSource.initialize().then(() => console.log('Conectou')).catch((err) => console.log(err));

export default AppDataSource;
