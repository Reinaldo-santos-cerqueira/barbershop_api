import { CreateClient, CreateEmployee } from '@service';
import { Request, Response } from 'express';

export class AuthenticationControllers {
    async createdClient(request: Request, response: Response): Promise<Response> {
        try {
            const { client, address } = request.body;
            const createClient = new CreateClient();
            const clientNew = await createClient.execute({ client, address });
            console.log(clientNew);
            return response.json({ message: 'Criado com sucesso' }).status(200);
        } catch (error) {
            console.log(error);

            return response.json({ message: 'Internal server error' });
        }
    }
    async createdEmployee(request: Request, response: Response): Promise<Response> {
        try {
            const { employee } = request.body;
            const createEmployee = new CreateEmployee();
            const employeeNew = await createEmployee.execute({ employee });
            console.log(employeeNew);
            return response.json({ message: 'Criado com sucesso' }).status(200);
        } catch (error) {
            console.log(error);

            return response.json({ message: 'Internal server error' });
        }
    }
}