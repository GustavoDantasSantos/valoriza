import './database';
import 'reflect-metadata';
import 'express-async-errors';
import Express, {Request, Response, NextFunction} from 'express';
import { router } from './router';

const app = Express();
app.use(Express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    if(err instanceof Error) { //se é uma instancia da classe Error 
        return response.status(400).json({
            error: err.message
        });
    };

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });

});

app.listen(3000, () => console.log(`Server is running`));