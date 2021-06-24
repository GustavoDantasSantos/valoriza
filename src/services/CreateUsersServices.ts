import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../respositories/UsersRepositories';
import { hash } from 'bcryptjs';

interface IUserRequest {
    name: string,
    email: string,
    password: string
    admin?: boolean
};

class CreateUsersServices {

    async execute( { name, email, admin = false, password } : IUserRequest ){
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        if(!email){
            throw new Error('Email incorreto');
        }

        const emailExistente = await usersRepositories.findOne({ email });
        
        if(emailExistente){
            throw new Error('Email já cadastrado');
        }
    
        const passwordHash = await hash(password, 8);

        const usuario = usersRepositories.create({
            name,
            email,
            admin,
            password: passwordHash
        });
        
        await usersRepositories.save(usuario);
        
        return usuario;
    }

}

export { CreateUsersServices };