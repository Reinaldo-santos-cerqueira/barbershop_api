import express, { Application, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { ErrorHandler } from '@middlewares';
import { AppError } from '@errors';
import dotenv from 'dotenv';
import { AuthenticationRoutes } from '@routes';

export interface IExpress {
    error: Error, req: Request, res: Response, next: NextFunction
}
dotenv.config();
export class AppServer {
    private app: Application;
    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
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
    private configureRoutes() {
        this.app.use('/authentication', AuthenticationRoutes);
    }
}

