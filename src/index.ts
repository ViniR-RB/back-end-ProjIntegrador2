import "reflect-metadata"
import express from 'express'
import router from './modules/routers/router';
import AppDataSource from './databases';











const app = express()
app.use(express.json());

const port = 3000;

app.get('/', (req,res) => {
    res.send({msg: "Bem Vindo a Api Hello Service 🚀 "})
})

const db = AppDataSource

db.initialize().then(() =>{
    console.log(db.isInitialized)
});




app.use(router);









app.listen(port,() =>{
    console.log( `Rodando em : https://localhost:${port} 🚀`);
});
