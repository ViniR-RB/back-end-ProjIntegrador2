import { Router } from "express";
import { ContaExistenteError, ContaInexistenteError, PasswordIsNotMatch } from "../../models/Erros";
import AuthenticateService from "../../services/AuthenticateService";
import AuthRepository from "./repository/Auth_Repository";





const router = Router()
const authrepository = new AuthRepository()
const authService = new AuthenticateService(authrepository)

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.createSeassion({
            email, password
        });

        console.log(user)

        return res.json({ user, token })
    } catch (error: any) {
        if (error instanceof PasswordIsNotMatch) {
            res.send(error.message);
        }
        if (error instanceof ContaExistenteError) {
            res.send(error.message);
        }
        if (error instanceof PasswordIsNotMatch) {
            res.send(error.message)
        }
        else {
            res.send(error.massage)
        }
    }


});



export default router
