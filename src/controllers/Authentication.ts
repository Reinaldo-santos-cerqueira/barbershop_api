/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateClient, CreateEmployee } from '@service';
import { Request, Response } from 'express';
export class AuthenticationControllers {
    async createdClient(request: Request, response: Response): Promise<Response> {
        const { client, address } = request.body;
        const createClient = new CreateClient();
        await createClient.execute({ client, address });
        return response.json({ message: 'Criado com sucesso' }).status(200);
    }
    async createdEmployee(request: Request, response: Response): Promise<Response> {
        const { employee } = request.body;
        const createEmployee = new CreateEmployee();
        await createEmployee.execute({ employee });
        return response.json({ message: 'Criado com sucesso' }).status(200);
    }
}