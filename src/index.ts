import express from 'express'
import router from './modules/routers/router';
import "reflect-metadata"
import {DataSource, Timestamp} from 'typeorm'
import AppDataSource from './databases';
import Appointment from './models/Appointment';

const app = express()
app.use(express.json());

const port = 3000;




app.get('/', (req,res) => {
    res.send({msg: "Bem Vindo a Api Hello Service"})
})
app.use(router);


const db =  async () => {
   await AppDataSource.initialize()

}
db;


app.listen(port,() =>{
    console.log( `Rodando em : https://localhost:${port}`);
});
