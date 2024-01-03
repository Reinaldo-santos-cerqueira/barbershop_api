import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppError } from '@middlewares';
import { AuthenticationRoutes } from '@routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    'origin': '*'
}));
const port = Number(process.env.port);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    const error = new AppError('Erro app teste', 404);
    next(error);
});
app.use('/authentication', AuthenticationRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

    if (error instanceof AppError) {
        const { message, statusCode } = error;
        return res.status(statusCode).json({
            error: message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});


app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});