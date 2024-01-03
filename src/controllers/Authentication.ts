import { Request, Response } from 'express';

export class AuthenticationControllers {
    login(request: Request, response: Response) {
        return response.json({ message: 'teste' });
    }
}