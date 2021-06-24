import { Request, Response } from 'express'
import { CreateUsersServices } from '../services/CreateUsersServices'

class CreateUserController {

    async handle(request: Request, response: Response){

        const { name, email, admin, password } = request.body;
        
        const createUsersService = new CreateUsersServices();

        try {
            const usuario = await createUsersService.execute({ name, email, admin, password });
            return response.json(usuario);
        }catch(error){
            return response.json({
                err: error.messege
            });
        }
    }
    
}

export { CreateUserController }

/**
 * 
 * Posso tratar com try catch o erro.
 * 
 * ou jogar mais pra cima e tratar com um midd nas rotas
 * 
 */