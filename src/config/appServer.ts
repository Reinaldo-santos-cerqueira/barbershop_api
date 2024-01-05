import express, { Application, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { ErrorHandler } from '@middlewares';
import { AppError } from '@errors';
import dotenv from 'dotenv';

export interface IExpress {
    error: Error, req: Request, res: Response, next: NextFunction
}
export interface IRoutes {
    method: 'get' | 'post' | 'patch' | 'put' | 'delete';
    url: string;
    controller: () => Promise<Response>
}
dotenv.config();
export class AppServer {
    private app: Application;
    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureErrorHandling();
        const port = Number(process.env.PORT || 3000);
        this.start(port);
    }

    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(cors({ origin: '*' }));
    }

    private configureErrorHandling() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const error = new AppError('Route not found', 404);
            next(error);
        });

        this.app.use(ErrorHandler);
    }

    private start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }


}

