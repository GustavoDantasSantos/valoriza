import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../respositories/TagsRepositories';


class CreateTagsService {

    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories);
    
        if(!name){
            throw new Error(`Nome incorreto!`);
        }

        const tagAlreadyExists = await tagsRepositories.findOne({ name });

        if(tagAlreadyExists){
            throw new Error(`Tag já cadastrada!`);
        }

        const tag = tagsRepositories.create({ name });

        await tagsRepositories.save(tag);

        return tag;
    }

}

export { CreateTagsService }