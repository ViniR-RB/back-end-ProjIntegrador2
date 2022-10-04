import AppDataSource from "../../../databases";
import User from "../../../models/User";

class UserRepository{



    public async findUser(email: string) : Promise<User | null>{
        const repository = AppDataSource.getRepository(User);

        const user = repository.findOne({
            where : { email}
        });





        return user || null
    }
}

export default UserRepository
