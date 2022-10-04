import { compare } from "bcryptjs"
import { ContaExistenteError, ContaInexistenteError, PasswordIsNotMatch } from "../models/Erros"
import { sign } from 'jsonwebtoken'
import User from "../models/User"
import AuthRepository from "../modules/auth/repository/Auth_Repository"
import authConfig from '../config/auth'
interface Request {
    email: string,
    password: string
}
interface Response{
    user: User,
    token : string
}


class AuthenticateService {
    private repository
    constructor(repository: AuthRepository) {
        this.repository = repository
    }
    public async createSeassion({ email, password }: Request): Promise<Response> {
        const user = await this.repository.findUser(email)

        if (!user) {
            throw new ContaExistenteError('Email ou Senha estão incorretas')
        }


        console.log(user.password)

        if (!await compare(password, user.password)) {

            throw new PasswordIsNotMatch('Password is not matched');
        }

        const token = sign({},authConfig.jwt.secret,{
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        } )
        return {user,token};
    }
}

export default AuthenticateService
