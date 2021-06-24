import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from "../respositories/ComplimentsRepositories";
import { UsersRepositories } from '../respositories/UsersRepositories';

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentsService {

    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest){
     
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);  
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver){
            throw new Error(`Usuario que receber não está correto`);
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if(!userReceiverExists){
            throw new Error(`Usuario não existe!`);
        }

        const compliment = await complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentsService };