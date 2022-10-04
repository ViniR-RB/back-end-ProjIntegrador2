import { hash } from 'bcryptjs'



import AppDataSource from "../databases";
import { ContaExistenteError } from "../models/Erros";
import User from "../models/User";
import UserRepository from "../modules/user/repository/Users_Repository";


interface Request {
    name: string;
    email: string;
    password: string;
}
interface Response {
    user: User
}

class UserSevices {
    private repository;


    constructor(repository: UserRepository) {
        this.repository = repository
    }




    public async createUser({ name, email, password }: Request): Promise<Response> {




        const findUser = await this.repository.findUser(email);

        if (findUser) {
            throw new ContaExistenteError('Email Already Exists')
        }

        const userrepository = AppDataSource.getRepository(User);


        const hashPassword = await hash(password, 10)


        const user = userrepository.create({
            name: name, password: hashPassword, email: email
        },);

        await userrepository.save(user)

        return { user };


    }
}


export default UserSevices;
