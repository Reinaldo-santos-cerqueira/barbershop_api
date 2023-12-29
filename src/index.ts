import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = Number(process.env.port);

app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});