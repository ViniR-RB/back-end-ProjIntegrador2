import AppDataSource from "../databases"
import User from "../models/User"
import path from 'path'
import upload from '../config/upload'
import fs from 'fs'
import UserSevices from "./UserServices"
interface Request {
    user_id: string,
    avatarfilename: string
}




class UpdateUserAvatarService {
    public async execute({ user_id, avatarfilename }: Request): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);


        const user = await userRepository.findOne({
            where: { id: user_id }
        });
        if (!user) {
            throw new Error('Only authenticated users can change avatar')
        }
        if (user.avatar){
            const userAvatarFilePath = path.join(upload.diretory,user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarfilename;

        await userRepository.save(user);



        return user;
    }
}
export default UpdateUserAvatarService
