import { compare } from 'bcryptjs'
import AppDataSource from "../../../databases";
import { ContaInexistenteError, PasswordIsNotMatch } from "../../../models/Erros";
import User from "../../../models/User";

class AuthRepository {


    public async findUser(email: string,): Promise<User | null> {
        const repository = AppDataSource.getRepository(User);

        const user = await repository.findOne({
            where: { email }
        });

        return user || null

    }
}


export default AuthRepository
