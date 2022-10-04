import 'reflect-metadata'
import { Router } from "express";
import multer from 'multer';
import {} from 'typeorm'
import uploadConfig from '../../config/upload';
import UserSevices from "../../services/UserServices";
import UserRepository from "./repository/Users_Repository";
import { ContaExistenteError } from '../../models/Erros';
import ensuredAuthenticated from '../../middlewares/ensuredAuthenticated';
import UpdateUserAvatarService from '../../services/UpdateUserAvatarService'




const router = Router()

const userRepository = new UserRepository();
const userServices = new UserSevices(userRepository);

const upload = multer(uploadConfig);

router.post('/createUser', async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await userServices.createUser({
            name: name, email: email, password: password
        });


        res.json(user);

    } catch (error: any) {
        if (error instanceof ContaExistenteError) {
            res.status(409).send(error.message)
        }
        else {
            res.status(500).send(error.massage)
        }
    }
});

router.patch('/avatar', ensuredAuthenticated,upload.single('avatar') , async (req, res) => {
    try {
        const updateUserAvatar = new UpdateUserAvatarService()
        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarfilename: req.file!.filename,
        });


        return res.json(user);
    } catch (error: any) {
        return res.status(400).json({err: error.message})
    }
});






export default router
