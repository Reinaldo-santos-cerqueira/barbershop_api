import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({
    'origin': '*'
}));
const port = Number(process.env.port);


app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});