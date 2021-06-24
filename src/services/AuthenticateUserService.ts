import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../respositories/UsersRepositories"
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';



interface IAuthRequest {
    email: string,
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthRequest){

        const usersRepositories = getCustomRepository(UsersRepositories);
        const user = await usersRepositories.findOne({ email });
    
        if(!user){
            throw new Error(`Email/Senha incorreto!`);
        }

        const passwordMatch = await compare(password, user.password);
    
        if(!passwordMatch){
            throw new Error(`Email/Senha incorreto!`);
        }

        const token = sign(
            {
                email: user.email,
            }, 
                "fdf161bcbc8d80c97f1868c379363b29",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }   
}

export { AuthenticateUserService }